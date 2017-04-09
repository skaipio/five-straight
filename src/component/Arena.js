import React from 'react';
import VisibleBoard from '../container/VisibleBoard';
import TurnCounter from '../container/TurnCounter';
import WinCounter from '../container/WinCounter';
import WinnerDisplay from '../container/WinnerDisplay';
import VisibleReset from '../container/VisibleReset';
import VisibleSizeSelector from '../container/VisibleSizeSelector';
import './Arena.css';

const Arena = () => (
  <div className="VerticalFlex Regular">
    <div>
      <h2 className="UpperCase">Five straight</h2>
    </div>
    <VisibleSizeSelector />
    <div className="WinnerDisplay">
      <WinnerDisplay />
    </div>
    <TurnCounter />
    <div className="Flex">
      <WinCounter player={1} />
      <VisibleBoard />
      <WinCounter player={2} />
    </div>
    <VisibleReset />
  </div>
)

export default Arena;
