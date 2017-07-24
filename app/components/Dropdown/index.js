import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Caret,
  Container,
} from './styles';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelectButton = this.handleSelectButton.bind(this);
  }

  handleSelectButton(index) {
    this.setState({ selected: index });
    this.props.modalDismiss();
  }

  handleToggle() {
    this.props.modalAdd(
      <div>
        {this.props.options.map((option, index) => (
          <Button key={index} onClick={() => this.handleSelectButton(index)}>
            {option.node({ ...option.props })}
          </Button>
          ))
        }
      </div>
    );
  }

  render() {
    const { selected } = this.state;
    const { options } = this.props;
    return (
      <Container>
        <Button onClick={this.handleToggle}>
          {options[selected].node({ ...options[selected].props })}
          <Caret className="fa fa-caret-down" />
        </Button>
      </Container>
    );
  }
}
Dropdown.propTypes = {
  modalAdd: PropTypes.func.isRequired,
  modalDismiss: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
};

export default Dropdown;
