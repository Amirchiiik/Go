import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

const InProgress = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContainer = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="in-progress">
      <div className="box in-progress-box">
        <ArrowRightIcon
          style={{
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          onClick={toggleContainer}
        />
        <p className="in-progress-title">
          <RadioButtonCheckedIcon />
          In Progress
        </p>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {/* Content goes here */}
        Container Content
      </div>
    </div>
  );
};

export default InProgress;
