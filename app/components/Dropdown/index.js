import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Caret,
  Container,
  ModalButton,
} from './styles';

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: this.props.selected };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleSelectButton = this.handleSelectButton.bind(this);
  }

  handleSelectButton(index) {
    this.setState({ selected: index });
    this.props.modalDismiss();
  }

  handleToggle() {
    this.props.modalAdd(
      <Container>
        {this.props.options.map((option, index) => (
          <ModalButton key={index} onClick={() => this.handleSelectButton(index)}>
            {option.node({ ...option.props })}
          </ModalButton>
          ))
        }
      </Container>
    );
  }

  render() {
    const { selected } = this.state;
    const { options } = this.props;
    return (
      <Container name="dropdown-button">
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
  selected: PropTypes.number.isRequired,
};

export default Dropdown;
