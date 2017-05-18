import React from 'react';

class MessageList extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom() {
    this.list.scrollTop = this.list.scrollHeight - this.list.clientHeight;
  }
  render() {
    const style = {
      width: '100%',
      margin: '0',
      listStyleType: 'none',
      padding: '0 0 5px 0',
      borderBottom: '1px solid black',
      height: '200px',
      overflow: 'auto',
    };
    return (
      <ul style={style} ref={(el) => { this.list = el; }}>
        {this.props.children}
      </ul>
    );
  }
}

MessageList.propTypes = {
  children: React.PropTypes.node,
};

export default MessageList;
