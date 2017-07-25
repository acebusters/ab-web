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
  icon,
  name,
  unit,
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
      <TokenUnit>{unit}</TokenUnit>
    </TokenWrapperRight>
  </TokenContainer>
);
Token.propTypes = {
  amount: PropTypes.number.isRequired,
  icon: PropTypes.node.isRequired,
  name: PropTypes.string.isRequired,
  unit: PropTypes.string.isRequired,
};

export default Token;
