import React from 'react';
import './SizeSelector.css';

const SizeSelector = ({onSizeSelect}) => {
  const onSelect = (event,) => {
    const size = parseInt(event.target.value, 10);
    onSizeSelect(size);
  }
  return (
    <div className="SizeSelector">
      <label>
      <span>Board size</span>
      <select onChange={onSelect}>
        <option value='5'>5x5</option>
        <option value='10'>10x10</option>
      </select>
      </label>
    </div>
  )
}

export default SizeSelector;
