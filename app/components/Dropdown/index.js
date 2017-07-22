import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Container,
} from './styles';

// const amount = 0.01;

// Wallet
/*
const children = (
  <div style={{ display: 'flex' }}>
    <div name="left">
      <span className="fa fa-square" />
      Ethereum
    </div>
    <div
      style={{ marginLeft: 'auto 0', minWidth: 100 }}
      name="right"
    >
      {amount}
      ETH
    </div>
    <span className="fa fa-caret-down" />
  </div>
);
*/

const Dropdown = ({
  children,
}) => (
  <Container>
    <Button>{children}</Button>
  </Container>
);
Dropdown.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Dropdown;
