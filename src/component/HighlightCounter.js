import React from 'react';
import './HighlightCounter.css';

function HighlightCounter(props) {
  if (!props.vertical) {
    return <h2 className="Regular">{props.label}<span className="Highlight">{props.count}</span></h2>;
  } else {
    return (
    <div className="VerticalFlex">
      <h2 className="Regular">{props.label}</h2>
      <h2 className="Highlight">{props.count}</h2>
    </div>
    );
  }
}

export default HighlightCounter;
