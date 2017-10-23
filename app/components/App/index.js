import React from 'react';
import PropTypes from 'prop-types';

import Content from 'components/Content';
import GoogleTagManager from 'containers/GTM';
import Modal from 'containers/Modal';
import Notifications from 'containers/Notifications';
import { conf } from '../../app.config';

const App = (props) => {
  const {
    location,
    notifications,
   } = props;
  const pathname = location.pathname;
  const isNotTable = pathname.indexOf('table') === -1;
  return (
    <div name="app-container">
      <GoogleTagManager gtmId={conf().gtmId} />

      <Notifications {...{ isNotTable, location }} />

      <Content
        isTable={!isNotTable}
        shiftForNotification={notifications.length > 0}
        fixed={props.fixed}
        name="content-wrapper"
      >
        {React.Children.toArray(props.children)}
      </Content>

      <Modal />
    </div>
  );
};
App.defaultProps = {
  fixed: false,
  initialCollapse: true,
};

App.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object,
  fixed: PropTypes.bool,
  notifications: PropTypes.array,
};

export default App;
