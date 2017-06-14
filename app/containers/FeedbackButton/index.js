import React from 'react';
import Raven from 'raven-js';

import styled from 'styled-components';

const Link = styled.a`
 cursor: pointer; 
 padding: 5px 10px;
 background-color: cornflowerblue;
 transform: rotate(90deg);
 display: inline-block;
 position: fixed;
 right: -23px;
 top: 150px;
 color: white;
 border-radius: 0 0 3px 3px;
`;

export class FeedbackButton extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  showReport() {
    Raven.captureMessage(`Feedback Button ${Date.now()}`);
    Raven.showReportDialog({
      eventId: Raven.lastEventId(),
      dsn: 'https://8c3e021848b247ddaf627c8040f94e07@sentry.io/153017',
    });
  }

  render() {
    return (
      <Link onClick={this.showReport}>feedback</Link>
    );
  }
}

export default FeedbackButton;
