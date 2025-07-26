import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { increment, decrement, incrementByAmount, reset } from '../store/slices/counterSlice';
import './Counter.css';

const Counter: React.FC = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();
  const [incrementAmount, setIncrementAmount] = useState<string>('');

  const handleIncrementByAmount = () => {
    const amount = parseInt(incrementAmount) || 0;
    if (amount !== 0) {
      dispatch(incrementByAmount(amount));
      setIncrementAmount('');
    }
  };

  return (
    <div className="counter-container">
      <div className="counter-card">
        <h2>Redux Counter</h2>
        <div className="counter-display">
          <span className="counter-value">{count}</span>
        </div>
        
        <div className="counter-controls">
          <button 
            className="counter-button decrement"
            onClick={() => dispatch(decrement())}
          >
            -1
          </button>
          
          <button 
            className="counter-button increment"
            onClick={() => dispatch(increment())}
          >
            +1
          </button>
          
          <button 
            className="counter-button reset"
            onClick={() => dispatch(reset())}
          >
            Reset
          </button>
        </div>

        <div className="custom-increment">
          <input
            type="number"
            value={incrementAmount}
            onChange={(e) => setIncrementAmount(e.target.value)}
            placeholder="Enter amount"
            className="amount-input"
          />
          <button 
            className="counter-button custom"
            onClick={handleIncrementByAmount}
            disabled={!incrementAmount}
          >
            Add Amount
          </button>
        </div>

        <div className="counter-info">
          <p>This counter demonstrates Redux state management</p>
          <p>Current value: <strong>{count}</strong></p>
        </div>
      </div>
    </div>
  );
};

export default Counter;