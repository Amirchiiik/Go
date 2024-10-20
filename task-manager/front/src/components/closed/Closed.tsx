import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { TaskType } from '../../state/tasks-reducer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ShowModalEnumType } from '../show-modal/ShowModal';

type ClosedPropsType = {
  setModalType: (modalType: ShowModalEnumType) => void;
};

const Closed = ({ setModalType }: ClosedPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const closedList = useSelector<RootStateType, TaskType[]>(
    (state) => state.tasks.closed
  );

  const toggleContainer = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className="closed">
        <div className="application-content closed-box">
          <div className="box">
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
          <div
            className="plus-icon"
            onClick={() => setModalType(ShowModalEnumType.CLOSED)}
          >
            <AddCircleOutlineIcon />
          </div>
        </div>
        <div className={`moving-container ${isOpen ? 'open' : ''}`}>
          {closedList.map((task) => {
            return (
              <div key={task.id} className="task-item">
                <input type="checkbox" checked />
                <p>{task.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Closed;
