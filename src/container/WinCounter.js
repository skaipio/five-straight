import { connect } from 'react-redux';
import HighlightCounter from '../component/HighlightCounter';

const mapStateToProps = (state, context) => ({
  count: state.wins[context.player - 1],
  label: 'Player ' + context.player,
  vertical: true
});

const WinCounter = connect(
  mapStateToProps
)(HighlightCounter)

export default WinCounter
