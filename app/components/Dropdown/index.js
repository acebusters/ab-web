import React from 'react';
import PropTypes from 'prop-types';

import Token from './Token';
import {
  Button,
  Caret,
  Container,
} from './styles';

const tokens = [{
  name: 'ethereum',
  amount: 0.13,
  unit: 'ETH',
  icon: 'url',
}, {
  name: 'nutz',
  amount: 1000,
  unit: 'NTZ',
  icon: 'url',
}];

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelectButton = this.handleSelectButton.bind(this);
  }

  handleSelectButton(name) {
    this.setState({ selected: name });
    this.props.modalDismiss();
  }

  handleToggle() {
    this.props.modalAdd(
      <Container>
        {tokens.map((token, index) => (
          <Button key={index} onClick={() => this.handleSelectButton(index)}>
            <Token token={token} />
          </Button>
          ))
        }
      </Container>
    );
  }

  render() {
    const { selected } = this.state;
    return (
      <Container>
        <Button onClick={this.handleToggle}>
          <Token token={tokens[selected]} />
          <Caret className="fa fa-caret-down" />
        </Button>
      </Container>
    );
  }
}
Dropdown.propTypes = {
  modalAdd: PropTypes.func.isRequired,
  modalDismiss: PropTypes.func.isRequired,
};

export default Dropdown;
