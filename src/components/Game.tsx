import React from 'react';
import './Game.css';

export default function Game() {
  return (
    <div className='gameArea'>
      <Screen />
      <Result />
    </div>
  );
}

function Screen() {
  return (
    <div>

    </div>
  );
}


function Result() {
  return (
    <div>
      <div><span className='resultLabel'>Time</span><span className='resultValue'>00:00</span></div>
      <div><span className='resultLabel'>Score</span><span className='resultValue'>11</span></div>
      <div><span className='resultLabel'>Score/s</span><span className='resultValue'>3.2</span></div>
      <div><span className='resultLabel'>Avg waiting time</span><span className='resultValue'>2:22</span></div>
      <div><span className='resultLabel'>Max waiting time</span><span className='resultValue'>3:33</span></div>
    </div>
  );
}