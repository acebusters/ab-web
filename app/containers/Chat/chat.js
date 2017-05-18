import React, { PropTypes } from 'react';

import MessageList from './message-list';
import MessageItem from './message-item';
import MessageBox from './message-box';

export class Chat extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.onAddMessage = this.onAddMessage.bind(this);
  }
  onAddMessage(message) {
    this.props.onAddMessage(message);
  }
  render() {
    return (
      <div>
        <MessageList>
          {(this.props.messages || []).map((message, i) =>
            <MessageItem message={message} key={i} />
          )}
        </MessageList>
        <MessageBox onAddMessage={this.onAddMessage} />
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.object,
  onAddMessage: PropTypes.func,
};

export default Chat;
