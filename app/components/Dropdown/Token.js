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

const Token = ({
  amount,
  name,
  unit,
  url,
}) => (
  <TokenContainer>
    <TokenWrapperLeft name="left">
      <TokenIcon url={url} className="fa fa-square" />
      <TokenName>{name}</TokenName>
    </TokenWrapperLeft>
    <TokenWrapperRight>
      <TokenAmount>{amount}</TokenAmount>
      <TokenUnit>{unit}</TokenUnit>
    </TokenWrapperRight>
  </TokenContainer>
);
Token.propTypes = {
  amount: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Token;
