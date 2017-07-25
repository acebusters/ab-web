import React from 'react';
import PropTypes from 'prop-types';

import {
  ToggleContainer as Container,
  ToggleButton as Button,
  ToggleOption as Option,
} from './styles';

class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: 0 };
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    const { selected } = this.state;
    const newState = selected === 1 ? 0 : 1;
    this.setState({ selected: newState });
  }

  render() {
    const { values } = this.props;
    const { selected } = this.state;
    return (
      <Container>
        <Button onClick={() => this.handleToggle()}>
          {values.map((value, index) => (
            <Option
              key={index}
              selected={selected === index}
            >
              {value.name}
            </Option>
          ))}
        </Button>
      </Container>
    );
  }
}
Toggle.propTypes = {
  values: PropTypes.array.isRequired,
};

export default Toggle;
