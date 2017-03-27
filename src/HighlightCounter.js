import React from 'react';
import './HighlightCounter.css';

function HighlightCounter(props) {
  return <h2 className="Regular">{props.label}<span className="Highlight">{props.count}</span></h2>;
}

export default HighlightCounter;
