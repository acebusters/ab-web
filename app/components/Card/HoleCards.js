import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card';
import FlipCard from './FlipCard';

import { HoleCardContainer, UpContainer, DownContainer } from './styles';

const cardSize = 48;

const HoleCards = ({ holeCards, folded }) => (
  <HoleCardContainer
    className="card-container"
    empty={holeCards[0] === null || folded}
  >
    {holeCards.map((card, i) => {
      if (!folded && card === -1) {
        return (
          <DownContainer key={i}>
            <Card cardNumber={card} size={cardSize} showFront={false} />
          </DownContainer>
        );
      }
      if (!folded && card !== null) {
        return (
          <UpContainer key={i}>
            <FlipCard {...{ card, cardSize }} />
          </UpContainer>
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
