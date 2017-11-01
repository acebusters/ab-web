import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import { BoardWrapper, BoardFront } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class BoardCards extends React.Component {
  static propTypes = {
    board: PropTypes.array.isRequired,
  };

  render() {
    const cardSize = 50;
    return (
      <BoardWrapper id="board">
        {this.props.board.map((card, i) => (
          <BoardFront key={i}>
            <Card
              cardNumber={card}
              size={cardSize}
              showFront
            />
          </BoardFront>
        ))}
      </BoardWrapper>
    );
  }
}

export default BoardCards;
