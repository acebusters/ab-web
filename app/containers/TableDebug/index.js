import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import EWT from 'ethereum-web-token';
import { formatNtz } from '../../utils/amountFormater';

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

const Table = styled.table`
  th, td {
    text-align: left;
  }

  th {
    padding: 0 10px;
  }

  td {
    padding: 5px 10px;
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

    this.state = {
      data: null,
      visible: !!JSON.parse(localStorage.getItem('table_debug_enabled') || 'false'),
      expanded: false,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleExpandedToggle = this.handleExpandedToggle.bind(this);

    window.enableTableDebug = () => {
      this.setState({ visible: true, expanded: true });
      localStorage.setItem('table_debug_enabled', true);
      this.handleRefresh();
    };

    window.disableTableDebug = () => {
      this.setState({ visible: false });
      localStorage.setItem('table_debug_enabled', false);
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
    const { tableService, handId } = this.props;
    tableService.debug(handId).then((response) => {
      this.setState({
        data: response,
      });
    });
  }

  renderDbHands(hands) {
    const dists = hands.map((hand) => parseDistribution(hand.distribution));

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
                  Dist
                </th>,
                <th key={(j * 2) + 1}>
                  Last
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
                    {dists[i] && renderNtz(dists[i][seat.address])}
                  </td>,
                  <td key={(j * 2) + 1}>
                    {renderNtz(parseLastReceiptAmount(seat.last))}
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

  renderData(data) {
    if (!data) {
      return null;
    }

    return (
      <div>
        {JSON.stringify(data.contract)}

        {this.renderDbHands(data.db)}

        <ul>
          <li>lastHandNetted: {data.contract.lastHandNetted}</li>
          <li>lastNettingRequestHandId: {data.contract.lastNettingRequestHandId}</li>
          <li>lastNettingRequestTime: {new Date(data.contract.lastNettingRequestTime * 1000).toString()}</li>
        </ul>
        <Table>
          <thead>
            <tr>
              <th>Hand Id</th>
              {data.db[0].lineup.map((_, i) =>
                <th key={i} colSpan={2}>Seat {i}</th>)}
            </tr>
            <tr>
              <th></th>
              {data.db[0].lineup.reduce((memo, _, i) => memo.concat([
                <th key={i * 2}>In</th>,
                <th key={(i * 2) + 1}>Out</th>,
              ]), [])}
            </tr>
          </thead>
          <tbody>
            {Object.keys(data.contract.hands).map((handId) => (
              <tr key={handId}>
                <td>{handId}</td>
                {data.db[0].lineup.reduce((memo, _, i) => memo.concat([
                  <td key={i * 2}>
                    {data.contract.hands[handId].ins[i]}
                  </td>,
                  <td key={(i * 2) + 1}>
                    {data.contract.hands[handId].outs[i] &&
                      data.contract.hands[handId].outs[i].out}
                  </td>,
                ]), [])}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }

  render() {
    const { visible, expanded, data } = this.state;

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

            {this.renderData(data)}
          </div>
        }
      </Wrapper>
    );
  }

}

TableDebug.propTypes = {
  tableService: PropTypes.object.isRequired,
  handId: PropTypes.number.isRequired,
};

function parseDistribution(distribution) {
  if (!distribution) {
    return {};
  }

  const { values } = EWT.parse(distribution);
  const lineup = values[2];

  return lineup.reduce((memo, seat) => {
    const signerAddr = `0x${seat.slice(0, 40)}`;
    const amount = parseInt(seat.slice(40), 16);

    return {
      ...memo,
      [signerAddr]: amount,
    };
  }, {});
}

function parseLastReceiptAmount(receipt) {
  if (!receipt) {
    return null;
  }

  const { values } = EWT.parse(receipt);

  return values[1];
}

function renderNtz(amount) {
  if (amount) {
    return `${formatNtz(amount)} NTZ`;
  }

  return (amount === null || amount === undefined) ? '-' : amount;
}
