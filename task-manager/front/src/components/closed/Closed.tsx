import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Closed = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContainer = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="closed">
      <div className="box closed-box">
        <ArrowRightIcon
          style={{
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          onClick={toggleContainer}
        />
        <p className="closed-title">
          <CheckCircleIcon />
          Closed
        </p>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {/* Content goes here */}
        Container Content
      </div>
    </div>
  );
};

export default Closed;
