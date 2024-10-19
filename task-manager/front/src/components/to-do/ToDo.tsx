import React, { useState } from 'react';
import "./to-do.css"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

const ToDo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContainer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="to-do">
      <div className="box to-do-box">
        <ArrowRightIcon
          style={{
            transition: 'transform 0.3s',
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
          }}
          onClick={toggleContainer}
        />
        <p className="to-do-title">
          <RadioButtonUncheckedIcon />
          To Do
        </p>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {/* Content goes here */}
        Container Content
      </div>
    </div>
  );
};

export default ToDo;
