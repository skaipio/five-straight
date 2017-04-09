import { connect } from 'react-redux';
import HighlightCounter from '../component/HighlightCounter';

const mapStateToProps = (state, context) => ({
  count: state.turn,
  label: "Turn ",
  vertical: false
});

const TurnCounter = connect(
  mapStateToProps
)(HighlightCounter)

export default TurnCounter
