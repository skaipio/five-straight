import { connect } from 'react-redux';
import Board from '../component/Board';
import { clickCell } from '../action';

const mapStateToProps = (state, context) => state

const mapDispatchToProps = {
  onCellClick: clickCell
}

const VisibleBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default VisibleBoard
