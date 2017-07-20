import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import { Receipt } from 'poker-helper';
import { FormattedDate, FormattedTime } from 'react-intl';
import { getWeb3 } from '../../containers/AccountProvider/utils';

import { formatNtz } from '../../utils/amountFormatter';
import { ABI_TABLE } from '../../app.config';

const EMPTY_ADDR = '0x0000000000000000000000000000000000000000';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  
  overflow: auto;
  width: 80%;
  max-height: 100vh;
  padding: 10px;

  opacity: 0.4;

  color: #000;
  background-color: #FFF;

  &:hover {
    opacity: 1;
  }
`;

const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Column = styled.div`
  flex: 1;
  margin-right: 30px;
`;

const Table = styled.table`
  th, td {
    text-align: left;
  }

  th {
    padding: 0 10px;
  }

  td {
    padding: 5px 10px;
    white-space: nowrap;
  }

  tbody tr:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.1);
  }

  tbody td:nth-child(2n + 1):not(:last-child),
  tbody th {
    border-right: 1px solid #ccc;
  }
`;

window.enableTableDebug = () => null;
window.disableTableDebug = () => null;

export default class TableDebug extends React.Component {

  constructor(props) {
    super(props);

    const visible = !!JSON.parse(localStorage.getItem('table_debug_enabled') || 'false');

    this.state = {
      data: null,
      contractData: null,
      visible,
      expanded: false,
    };

    this.table = getWeb3().eth.contract(ABI_TABLE).at(props.contract.address);

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleExpandedToggle = this.handleExpandedToggle.bind(this);

    const events = props.contract.allEvents({ to: 'latest' });
    window.enableTableDebug = () => {
      this.setState({ visible: true, expanded: true });
      localStorage.setItem('table_debug_enabled', true);
      this.handleRefresh();
      events.watch(() => this.handleRefresh());
    };

    if (visible) {
      this.handleRefresh();
      events.watch(() => this.handleRefresh());
    }

    window.disableTableDebug = () => {
      this.setState({ visible: false });
      localStorage.setItem('table_debug_enabled', false);
      events.stopWatching(() => null);
    };
  }

  componentWillUnmount() {
    window.enableTableDebug = () => null;
    window.disableTableDebug = () => null;
  }

  handleExpandedToggle() {
    this.setState((state) => ({ expanded: !state.expanded }));
  }

  handleRefresh() {
    const { tableService } = this.props;
    tableService.debug().then((response) => {
      this.setState({
        data: response,
      });
    });

    loadContractData(this.table).then((contractData) => {
      this.setState({ contractData });
    });
  }

  renderContractData(contractData) {
    const lastNettingRequestTime = new Date(contractData.lastNettingRequestTime * 1000);

    return (
      <div>
        <ul>
          <li>
            <strong>lastHandNetted: </strong>
            {contractData.lastHandNetted.toString()}
          </li>
          <li>
            <strong>lastNettingRequestHandId: </strong>
            {contractData.lastNettingRequestHandId.toString()}
          </li>
          <li>
            <strong>lastNettingRequestTime: </strong>
            <FormattedDate value={lastNettingRequestTime} />, <FormattedTime value={lastNettingRequestTime} />
          </li>
        </ul>
        <Table>
          <thead>
            <tr>
              <th>Hand Id</th>
              {contractData.lineup.map((_, i) =>
                <th key={i} colSpan={2}>Seat {i}</th>)}
            </tr>
            <tr>
              <th></th>
              {contractData.lineup.reduce((memo, _, i) => memo.concat([
                <th key={i * 2}>In</th>,
                <th key={(i * 2) + 1}>Out</th>,
              ]), [])}
            </tr>
          </thead>
          <tbody>
            {Object.keys(contractData.hands).map((handId) => (
              <tr key={handId}>
                <td>{handId}</td>
                {contractData.lineup.reduce((memo, _, i) => memo.concat([
                  <td key={i * 2}>
                    {formatNtz(contractData.hands[handId].ins[i])}
                  </td>,
                  <td key={(i * 2) + 1}>
                    {contractData.hands[handId].outs[i] &&
                      formatNtz(contractData.hands[handId].outs[i].out)}
                  </td>,
                ]), [])}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Bal.</th>
              {contractData.lineup.map((seat, i) =>
                <td key={i} colSpan={2}>{formatNtz(seat.amount)}</td>)}
            </tr>
            <tr>
              <th>Exit hand</th>
              {contractData.lineup.map((seat, i) =>
                <td key={i} colSpan={2}>{seat.exitHand && seat.exitHand.toString()}</td>)}
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }

  renderDbHands(hands) {
    const dists = hands.map((hand) => parseDistribution(hand.distribution, hand.lineup));

    return (
      <div>
        <Table>
          <thead>
            <tr>
              <th>Hand Id</th>
              {hands[0].lineup.map((_, j) =>
                <th key={j} colSpan={2}>Seat {j}</th>
              )}
            </tr>
            <tr>
              <td />
              {hands[0].lineup.reduce((memo, seat, j) => memo.concat([
                <th key={j * 2}>
                  Bet
                </th>,
                <th key={(j * 2) + 1}>
                  Dist
                </th>,
              ]), [])}
            </tr>
          </thead>
          <tbody>
            {hands.map((hand, i) => (
              <tr key={hand.handId}>
                <th>{hand.handId}</th>
                {hand.lineup.reduce((memo, seat, j) => memo.concat([
                  <td key={j * 2}>
                    {renderNtz(parseLastReceiptAmount(seat.last))}
                  </td>,
                  <td key={(j * 2) + 1}>
                    {dists[i] && renderNtz(dists[i][seat.address])}
                  </td>,
                ]), [])}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>Exit hand</th>
              {hands[0].lineup.map((seat, j) =>
                <td key={j} colSpan={2}>{seat.exitHand}</td>
              )}
            </tr>
          </tfoot>
        </Table>
      </div>
    );
  }

  renderData(data, contractData) {
    if (!data && !contractData) {
      return null;
    }

    return (
      <div>
        <Columns>
          {contractData &&
            <Column>
              <h2>Contract</h2>
              {this.renderContractData(contractData)}
            </Column>
          }
          {data && data.db &&
            <Column>
              <h2>Db</h2>
              {this.renderDbHands(data.db)}
            </Column>
          }
        </Columns>
      </div>
    );
  }

  render() {
    const { visible, expanded, data, contractData } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <Wrapper>
        <button onClick={this.handleExpandedToggle}>
          {expanded ? 'close' : 'open debug pane' }
        </button>
        {expanded &&
          <div>
            <button onClick={this.handleRefresh}>
              refresh
            </button>
            <hr />

            {this.renderData(data, contractData)}
          </div>
        }
      </Wrapper>
    );
  }

}

TableDebug.propTypes = {
  contract: PropTypes.object.isRequired,
  tableService: PropTypes.object.isRequired,
};

function parseDistribution(distribution, lineup) {
  if (!distribution) {
    return {};
  }

  const { outs } = Receipt.parse(distribution);

  return lineup.reduce((memo, seat, pos) => ({
    ...memo,
    [seat.address]: outs[pos],
  }), {});
}

function parseLastReceiptAmount(receipt) {
  if (!receipt) {
    return null;
  }

  return Receipt.parse(receipt).amount;
}

function renderNtz(amount) {
  if (amount) {
    return `${formatNtz(amount, 1)} NTZ`;
  }

  return (amount === null || amount === undefined) ? '-' : amount;
}

function promisifyContractCall(contract, method) {
  return (...args) => new Promise((resolve, reject) => {
    contract[method].call(
      ...args,
      (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  });
}

function getLineup(contract) {
  return promisifyContractCall(contract, 'getLineup')().then((lineup) => {
    const rv = [];
    for (let i = 0; i < lineup[1].length; i += 1) {
      rv.push({
        address: lineup[1][i],
        amount: lineup[2][i],
      });
      if (lineup[3][i] > 0) {
        rv[i].exitHand = lineup[3][i];
      }
    }
    return {
      lastHandNetted: lineup[0],
      lineup: rv,
    };
  });
}

function getIns(contract, handId, lineup) {
  const getIn = promisifyContractCall(contract, 'getIn');
  return Promise.all(lineup.map(({ address }) => {
    if (address === EMPTY_ADDR) {
      return Promise.resolve(null);
    }

    return getIn(handId, address);
  }));
}

function getOuts(contract, handId, lineup) {
  const getOut = promisifyContractCall(contract, 'getOut');
  return Promise.all(lineup.map(({ address }) => {
    if (address === EMPTY_ADDR) {
      return Promise.resolve(null);
    }

    return getOut(handId, address).then(([claimCount, out]) => ({ claimCount, out }));
  }));
}

function getLastNettingRequestHandId(contract) {
  return promisifyContractCall(contract, 'lastNettingRequestHandId')();
}

function getLastNettingRequestTime(contract) {
  return promisifyContractCall(contract, 'lastNettingRequestTime')();
}

function handsRange(handA, handB) {
  const start = Math.min(handA, handB);
  const end = Math.max(handA, handB);
  const range = [];

  for (let i = start; i <= end; i += 1) {
    range.push(i);
  }

  return range;
}

function loadContractData(contract) {
  return Promise.all([
    getLineup(contract),
    getLastNettingRequestHandId(contract),
    getLastNettingRequestTime(contract),
  ]).then(([
    { lineup, lastHandNetted },
    lastNettingRequestHandId,
    lastNettingRequestTime,
  ]) => {
    const hands = handsRange(lastHandNetted, lastNettingRequestHandId);
    const promises = hands.reduce((memo, handId) => [
      ...memo,
      getIns(contract, handId, lineup),
      getOuts(contract, handId, lineup),
    ], []);

    return Promise.all(promises)
      .then((results) => ({
        lineup,
        hands: hands.reduce((memo, handId, i) => ({
          ...memo,
          [handId]: { ins: results[i * 2], outs: results[(i * 2) + 1] },
        }), {}),
        lastHandNetted,
        lastNettingRequestHandId,
        lastNettingRequestTime,
      }));
  });
}
