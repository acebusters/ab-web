import React from 'react';
import PropTypes from 'prop-types';
import Header from 'containers/Header';
import Footer from 'components/Footer';
import { StyledDashboard } from 'components/App/styles';

const DashboardFrame = (props) => (
  <StyledDashboard params={props.params} name="styled-dashboard">
    <Header {...props} />
    {React.Children.toArray(props.children)}
    <Footer />
  </StyledDashboard>
);
DashboardFrame.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
};

export default DashboardFrame;
