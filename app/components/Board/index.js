import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import { BoardWrapper, BoardCardWrapper } from './styles';

class Board extends React.Component {
  static propTypes = {
    board: PropTypes.array.isRequired,
  };

  renderBoard() {
    const cards = this.props.board;
    const cardSize = 50;

    if (Array.isArray(cards)) {
      return cards.map((card, i) => (
        <BoardCardWrapper key={i}>
          <Card cardNumber={card} size={cardSize} />
        </BoardCardWrapper>
      ));
    }

    return null;
  }

  render() {
    return (
      <BoardWrapper id="board">
        {this.renderBoard()}
      </BoardWrapper>
    );
  }
}

export default Board;
