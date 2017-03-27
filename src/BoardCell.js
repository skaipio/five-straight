import React, {Component} from 'react';

class BoardCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      symbol: ''
    };
  }

  handleClick() {
    const player = this.props.onClick();
    if (player !== 0){
      const symbol = player == 1 ? 'X' : 'O';
      this.setState({
        symbol: symbol
      });
    }
  }

  render() {
    return (
      <td>
        <button onClick={() => this.handleClick()}>{this.state.symbol}</button>
      </td>
    );
  }
}

export default BoardCell;
