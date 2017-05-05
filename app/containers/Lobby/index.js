/**
 * Created by helge on 06.10.16.
 */

import React from 'react';
import Grid from 'grid-styled';
import Button from 'components/Button';
import Container from 'components/Container';
import { TableStriped } from 'components/List';
import H2 from 'components/H2';
import { createStructuredSelector } from 'reselect';
import LobbyItem from '../LobbyItem';
import { tableReceived } from '../Table/actions';
import { makeSelectLobby } from './selectors';
import { makeSelectPrivKey } from '../AccountProvider/selectors';
import { fetchTables } from '../../services/tableService';
import web3Connect from '../AccountProvider/web3Connect';


class LobbyComponent extends React.PureComponent {  // eslint-disable-line

  constructor(props) {
    super(props);
    this.handleGetTables = this.handleGetTables.bind(this);
    this.web3 = props.web3Redux.web3;
    this.handleGetTables();
  }

  handleGetTables() {
    fetchTables({
      web3: this.web3,
      privKey: this.props.privKey,
    }).then((tables) => {
      if (tables) {
        tables.forEach((tableAddr) => this.props.tableReceived(tableAddr));
      }
    });
  }

  render() {
    let content = [];
    if (this.props.lobby) {
      content = this.props.lobby.map((tableAddr, i) =>
        <LobbyItem key={i} tableAddr={tableAddr} />
      );
    }
    return (
      <Container>
        <H2> Table Overview </H2>

        <TableStriped>
          <thead>
            <tr>
              <th key="number"> # </th>
              <th key="blind"> Blind </th>
              <th key="play"> Players </th>
              <th key="hand"> Hand </th>
              <th key="actn"> Action </th>
            </tr>
          </thead>
          <tbody>
            {content}
          </tbody>
        </TableStriped>
        <Grid xs={1 / 4} >
          <div style={{ float: 'left' }}>
            <Button onClick={this.handleGetTables} size="medium" icon="fa fa-refresh">REFRESH</Button>
          </div>
        </Grid>
        <Grid xs={3 / 4}>
        </Grid>
      </Container>
    );
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    tableReceived: (tableAddr) => dispatch(tableReceived(tableAddr)),
  };
}

const mapStateToProps = createStructuredSelector({
  lobby: makeSelectLobby(),
  privKey: makeSelectPrivKey(),
});

LobbyComponent.propTypes = {
  lobby: React.PropTypes.array,
  tableReceived: React.PropTypes.func,
  web3Redux: React.PropTypes.any,
  privKey: React.PropTypes.string,
};

export default web3Connect(mapStateToProps, mapDispatchToProps)(LobbyComponent);
