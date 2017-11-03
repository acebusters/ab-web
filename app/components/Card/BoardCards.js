import React from 'react';
import PropTypes from 'prop-types';
import Card from 'components/Card';
import { BoardFront } from './styles';
import BoardWrapper from './BoardWrapper';

// eslint-disable-next-line react/prefer-stateless-function
class BoardCards extends React.Component {
  static propTypes = {
    board: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      cards: [],
    };

    setTimeout(() => {
      this.setState({ cards: [1, 2, 3] });
    }, 500);
  }

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
