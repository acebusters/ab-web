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
  amountUnit,
  icon,
  name,
}) => (
  <TokenContainer>
    <TokenWrapperLeft name="left">
      <TokenIcon>
        {icon}
      </TokenIcon>
      <TokenName>{name}</TokenName>
    </TokenWrapperLeft>
    <TokenWrapperRight>
      <TokenAmount>{amount}</TokenAmount>
      <TokenUnit>{amountUnit}</TokenUnit>
    </TokenWrapperRight>
  </TokenContainer>
);
Token.propTypes = {
  amount: PropTypes.number.isRequired,
  amountUnit: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
};

export default Token;
