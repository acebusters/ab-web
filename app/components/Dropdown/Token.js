import React from 'react';
import PropTypes from 'prop-types';

import {
  TokenAmount,
  TokenContainer,
  TokenIcon,
  TokenName,
  TokenUnit,
  TokenWrapperLeft,
  TokenWrapperRight,
} from './styles';

const Token = ({ token }) => (
  <TokenContainer>
    <TokenWrapperLeft name="left">
      <TokenIcon url={token.url} className="fa fa-square" />
      <TokenName>{token.name}</TokenName>
    </TokenWrapperLeft>
    <TokenWrapperRight>
      <TokenAmount>{token.amount}</TokenAmount>
      <TokenUnit>{token.unit}</TokenUnit>
    </TokenWrapperRight>
  </TokenContainer>
);
Token.propTypes = {
  token: PropTypes.object.isRequired,
};

export default Token;
