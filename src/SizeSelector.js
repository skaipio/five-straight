import React from 'react';
import './SizeSelector.css';

function SizeSelector(props) {
  return (
    <div className="SizeSelector">
      <label>
      <span>Board size</span>
      <select onChange={props.onSizeSelect}>
        <option value='5'>5x5</option>
        <option value='10'>10x10</option>
      </select>
      </label>
    </div>
  );
}

export default SizeSelector;
