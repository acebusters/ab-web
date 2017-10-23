import React from 'react';
import PropTypes from 'prop-types';
import Notifications from 'containers/Notifications';
import { StyledTable } from './styles';

const TableFrame = (props) => (
  <StyledTable name="styled-dashboard">
    <Notifications {...{ isNotTable: false, location }} />
    {React.Children.toArray(props.children)}
  </StyledTable>
);
TableFrame.propTypes = {
  children: PropTypes.node,
};

export default TableFrame;
