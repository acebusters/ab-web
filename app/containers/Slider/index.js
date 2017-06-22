import React from 'react';
import { connect } from 'react-redux';

import Slider from '../../components/Slider';

const SliderContainer = (props) => (
  <Slider {...props} />
);

export default connect()(SliderContainer);
