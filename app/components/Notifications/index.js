import React from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import { Link } from './styles';

export const notLoggedIn = {
  txId: 'AUTH_NOT_LOGGED_IN',
  notifyType: 'AUTH_NOT_LOGGED_IN',
  category: 'Visitor Mode',
  details: <span>Please <Link to="login">login</Link> or <Link to="register">signup</Link> to join a game.</span>,
  removing: false,
  dismissable: false,
  date: new Date(),
  type: 'info',
};

const Tester = (props) => {
  const { notifications, loggedIn } = props;
  // testing for loggedIn here because the Notifications saga does not pickup the dispatch SET_AUTH after a browser refresh
  if (loggedIn) {
    return (
      <div>
        {notifications.length !== 0 &&
          notifications.map(
            (item, i) => <Notification key={i} {...item} {...props} />,
          )
        }
      </div>
    );
  }
  return <Notification {...notLoggedIn} {...props} />;
};
Tester.propTypes = {
  loggedIn: PropTypes.bool,
  notifications: PropTypes.array,
};

export default Tester;
