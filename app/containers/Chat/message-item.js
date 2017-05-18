import React from 'react';
import { nickNameByAddress } from '../../services/nicknames';

class MessageItem extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <li style={{ padding: '5px 5px 0 5px' }}>
        <u>{ nickNameByAddress(this.props.message.signer) }</u> &gt; { this.props.message.message }
      </li>
    );
  }
}

MessageItem.propTypes = {
  message: React.PropTypes.object,
};

export default MessageItem;
