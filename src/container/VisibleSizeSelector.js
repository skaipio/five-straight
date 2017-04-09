import { connect } from 'react-redux';
import { selectBoardSize } from '../action';
import SizeSelector from '../component/SizeSelector';

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onSizeSelect: selectBoardSize
}

const VisibleSizeSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(SizeSelector)

export default VisibleSizeSelector
