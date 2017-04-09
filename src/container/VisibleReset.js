import React from 'react';
import { connect } from 'react-redux';
import { resetGame } from '../action';

const ResetButton = ({onClick}) => (
  <button className="Reset button" onClick={onClick}>Reset</button>
)

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  onClick: resetGame
}

const VisibleReset = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetButton)

export default VisibleReset
