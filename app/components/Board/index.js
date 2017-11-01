import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import { BoardWrapper, CardWrapper } from './styles';

// eslint-disable-next-line react/prefer-stateless-function
class Board extends React.Component {
  static propTypes = {
    board: PropTypes.array.isRequired,
  };

  render() {
    const cardSize = 50;
    return (
      <BoardWrapper id="board">
        {this.props.board.map((card, i) => (
          <CardWrapper key={i}>
            <Card cardNumber={card} size={cardSize} />
          </CardWrapper>
        ))}
      </BoardWrapper>
    );
  }
}

export default Board;
