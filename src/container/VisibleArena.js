import { connect } from 'react-redux';
import Arena from '../component/Arena';
import { } from '../action';

const mapStateToProps = (state, context) => state

const mapDispatchToProps = (dispatch) => ({})

const VisibleArena = connect(
  mapStateToProps,
  mapDispatchToProps
)(Arena)

export default VisibleArena
