import React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  z-index: 1000;
  bottom: 0;
  right: 0;
  
  width: 80%;
  padding: 10px;

  opacity: 0.4;

  color: #000;
  background-color: #FFF;

  &:hover {
    opacity: 1;
  }
`;

window.enableTableDebug = () => null;

export default class TableDebug extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: null,
      visible: false,
      expanded: false,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleExpandedToggle = this.handleExpandedToggle.bind(this);

    window.enableTableDebug = () => {
      this.setState({ visible: true, expanded: true });
      this.handleRefresh();
    };
  }

  componentWillUnmount() {
    window.enableTableDebug = () => null;
  }

  handleExpandedToggle() {
    this.setState((state) => ({ expanded: !state.expanded }));
  }

  handleRefresh() {
    const { tableService, handId } = this.props;
    tableService.debug(handId).then((response) => {
      this.setState({
        data: response,
      });
    });
  }

  render() {
    const { visible, expanded, data } = this.state;

    if (!visible) {
      return null;
    }

    return (
      <Wrapper>
        <button onClick={this.handleExpandedToggle}>
          {expanded ? 'close' : 'open debug pane' }
        </button>
        {expanded &&
          <div>
            <button onClick={this.handleRefresh}>
              refresh
            </button>
            <hr />
            {JSON.stringify(data)}
          </div>
        }
      </Wrapper>
    );
  }

}

TableDebug.propTypes = {
  tableService: PropTypes.object.isRequired,
  handId: PropTypes.number.isRequired,
};
