import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import Card from 'components/Card';

const prop = (propName) => (props) => props[propName];

const Container = styled.div`
  position: relative;
  width: ${prop('cardWidth')}px;
  height: ${prop('cardHeight')}px;

  & + & {
    margin-left: 0.5em;
  }
`;

const CardWrapper = styled.div`
  position: absolute;
  width: ${prop('cardWidth')}px;
  height: ${prop('cardHeight')}px;
  backface-visibility: hidden;
`;

const enter = (front = true) => keyframes`
  0% {
    opacity: 0.3;
    transform: rotateY(${front ? 180 : 0}deg) translateY(-400px);
  }

  70% {
    opacity: 1;
    transform: rotateY(${front ? 180 : 0}deg) translateY(0);
  }

  100% {
    opacity: 1;
    transform: rotateY(${front ? 0 : 180}deg);
  }
`;

const leave = (front = true) => keyframes`
  0% {
    opacity: 1;
    transform: rotateY(${front ? 0 : 180}deg);
  }

  30% {
    opacity: 1;
    transform: rotateY(${front ? 180 : 0}deg) translateY(0);
  }

  100% {
    opacity: 0.3;
    transform: rotateY(${front ? 180 : 0}deg) translateY(-400px);
  }
`;

const animationFn = (props) => props.leaving ? leave : enter;

const FrontWrapper = styled(CardWrapper)`
  opacity: 0;
  animation: ${(props) => animationFn(props)(true)} 1.5s;
  animation-delay: ${(props) => props.animNum * (props.leaving ? 0 : 0.1)}s;
  animation-fill-mode: forwards;
`;

const BackWrapper = styled(CardWrapper)`
  opacity: 0;
  animation: ${(props) => animationFn(props)(false)} 1.5s;
  animation-delay: ${(props) => props.animNum * (props.leaving ? 0 : 0.1)}s;
  animation-fill-mode: forwards;
`;

// eslint-disable-next-line react/prefer-stateless-function
class BoardCard extends React.Component {
  static propTypes = {
    animNum: PropTypes.number.isRequired,
    cardNumber: PropTypes.number.isRequired,
    cardHeight: PropTypes.number.isRequired,
    cardWidth: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      leaving: false,
    };
  }

  componentWillLeave(callback) {
    this.setState({ leaving: true, entered: false });
    setTimeout(callback, 1500);
  }

  render() {
    const { cardHeight, cardWidth, cardNumber } = this.props;

    return (
      <Container
        ref={(c) => { this.wrap = c; }}
        cardWidth={cardWidth}
        cardHeight={cardHeight}
        {...this.state}
      >
        <FrontWrapper
          ref={(c) => { this.front = c; }}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          animNum={this.props.animNum}
          {...this.state}
        >
          <Card {...{ cardNumber, cardHeight }} />
        </FrontWrapper>
        <BackWrapper
          ref={(c) => { this.back = c; }}
          cardWidth={cardWidth}
          cardHeight={cardHeight}
          animNum={this.props.animNum}
          {...this.state}
        >
          <Card {...{ cardNumber: -1, cardHeight }} />
        </BackWrapper>
      </Container>
    );
  }
}

export default BoardCard;
