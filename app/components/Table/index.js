import React from 'react';
import PropTypes from 'prop-types';
import BoardCards from 'components/Card/BoardCards';
import Seat from 'containers/Seat';
import TableMenu from '../../containers/TableMenu';
import ActionBar from '../../containers/ActionBar';
import tableImage from './tableBG.svg';
import Pot from '../Pot';
import Curtain from '../../containers/Curtain';
import { tableNameByAddress } from '../../services/tableNames';

import {
  TableName,
  TableContainer,
  TableAndChairs,
  PokerTable,
  HandBox,
  Winner,
} from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class TableComponent extends React.Component {
  static propTypes = {
    board: PropTypes.array,
    potSize: PropTypes.number,
    winners: PropTypes.array,
    myHand: PropTypes.object,
    sb: PropTypes.number,
    seats: PropTypes.array.isRequired,
    params: PropTypes.object,
    isTaken: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div name="table-component">
        <Curtain {...this.props} />

        <TableContainer name="table-container">
          <TableName>
            {tableNameByAddress(this.props.params.tableAddr)}
          </TableName>

          <TableAndChairs id="table-and-chairs" >
            <PokerTable>
              <img src={tableImage} alt="" />
              { this.props.potSize > 0 &&
                <Pot className="pot" potSize={this.props.potSize} top="58%" left="50%" />
              }

              {this.props.seats.map((seat, i) => (
                <Seat
                  key={i}
                  pos={i}
                  sitout={seat.sitout}
                  signerAddr={seat.address}
                  params={this.props.params}
                  isTaken={this.props.isTaken}
                />
              ))}

              <BoardCards board={this.props.board} />

              { this.props.winners.length > 0 &&
                <Winner className="winner">{ this.props.winners }</Winner>
              }
            </PokerTable>
          </TableAndChairs>

          {this.props.myHand &&
            <HandBox className="hand-box">{this.props.myHand.descr}</HandBox>
          }

          <TableMenu {...this.props} />

          <ActionBar className="action-bar" {...this.props} sb={this.props.sb}></ActionBar>

        </TableContainer>

      </div>
    );
  }
}

export default TableComponent;
