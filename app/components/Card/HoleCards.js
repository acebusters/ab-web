import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';

import { HoleCardContainer, HoleBack, HoleFront } from './styles';

const cardSize = 48;

const HoleCards = ({
  holeCards,
  folded,
}) => (
  <HoleCardContainer
    className="card-container"
    empty={holeCards[0] === null || folded}
  >
    {holeCards.map((card, i) => {
      if (!folded && card === -1) {
        return (
          <HoleBack key={i}>
            <Card
              cardNumber={card}
              size={cardSize}
              showFront={false}
            />
          </HoleBack>
        );
      }
      if (!folded && card !== null) {
        return (
          <HoleFront key={i}>
            <Card
              cardNumber={card}
              size={cardSize}
              showFront
            />
          </HoleFront>
        );
      }
      return null;
    })}
  </HoleCardContainer>
);
HoleCards.propTypes = {
  folded: PropTypes.bool,
  holeCards: PropTypes.array, // array of cards
};

export default HoleCards;
