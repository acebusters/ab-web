/**
 * Created by helge on 14.02.17.
 */

import React from 'react';
import { Board } from './Board';
import TableMenu from '../TableMenu';
import ActionBar from '../../containers/ActionBar';
import tableImage from './tableBG.svg';
import Pot from '../Pot';

import {
  TableHeader,
  TableContainer,
  TableAndChairs,
  PokerTable,
  HandBox,
  Winner,
} from './styles';

const TableComponent = (props) => (
  <div>

    { (props.myPos > -1) &&
      <TableMenu {...props} />
    }

    <TableHeader className="table-header">
      { `state: ${props.state}` } <br />
    </TableHeader>

    <TableContainer>

      <TableAndChairs id="table-and-chairs" >

        <PokerTable id="poker-table">

          <img src={tableImage} alt="" />

          <Pot potSize={props.potSize} top="85%" left="45%" />

          { props.seats }

          <Board id="board" board={props.board}>
            { props.board }
          </Board>

          { props.winners.length > 0 &&
            <Winner className="winner">{ props.winners }</Winner>
          }
        </PokerTable>

      </TableAndChairs>

      { props.myHand &&
        <HandBox className="hand-box"> { props.myHand.descr }</HandBox>
      }

      <ActionBar className="action-bar" {...props} sb={props.sb}></ActionBar>

    </TableContainer>

  </div>
);

TableComponent.propTypes = {
  state: React.PropTypes.string,
  board: React.PropTypes.array,
  seats: React.PropTypes.array,
  potSize: React.PropTypes.number,
  myPos: React.PropTypes.number,
  winners: React.PropTypes.array,
  myHand: React.PropTypes.object,
  sb: React.PropTypes.number,
};

export default TableComponent;
