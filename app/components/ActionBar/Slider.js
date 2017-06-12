import React from 'react';
import RCSlider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
    this.onSliderChange = this.onSliderChange.bind(this);
    this.onSliderUpdate = this.onSliderUpdate.bind(this);
  }
  onSliderChange(value) {
    this.setState({ value });
  }
  onSliderUpdate(value) {
    this.props.updateAmount(value);
  }
  render() {
    return (
      <RCSlider
        min={this.props.minRaise}
        max={this.props.myStack}
        value={this.state.value}
        onChange={this.onSliderChange}
        onAfterChange={this.onSliderUpdate}
      />
    );
  }
}
Slider.propTypes = {
  updateAmount: React.PropTypes.func,
  minRaise: React.PropTypes.number,
  myStack: React.PropTypes.number,
};

export default Slider;
