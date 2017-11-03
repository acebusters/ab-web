import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';

import { CardFront, CardBack, FlipCardWrapper, FlipCardContainer } from './styles';

// front of card shows suit and number
// back of card shows commom design
// eslint-disable-next-line react/prefer-stateless-function
class FlipCard extends React.Component {
  static propTypes = {
    card: PropTypes.number.isRequired,
    cardSize: PropTypes.number.isRequired,
  }

  render() {
    const { cardSize, card } = this.props;
    return (
      <FlipCardContainer>
        <FlipCardWrapper>
          <CardFront>
            <Card cardNumber={card} size={cardSize} showFront />
          </CardFront>
          <CardBack>
            <Card size={cardSize} showFront={false} />
          </CardBack>
        </FlipCardWrapper>
      </FlipCardContainer>
    );
  }
}

export default FlipCard;
