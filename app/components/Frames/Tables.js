import React from 'react';
import PropTypes from 'prop-types';
import { StyledDashboard } from 'components/App/styles';

const TableFrame = (props) => (
  <StyledDashboard params={props.params} name="styled-dashboard">
    {React.Children.toArray(props.children)}
  </StyledDashboard>
);
TableFrame.propTypes = {
  children: PropTypes.node,
  params: PropTypes.object.isRequired,
};

export default TableFrame;
