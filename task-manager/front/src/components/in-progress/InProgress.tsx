import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { TaskType } from '../../state/tasks-reducer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ShowModalEnumType } from '../show-modal/ShowModal';

type InProgressPropsType = {
  setModalType: (modalType: ShowModalEnumType) => void;
}

const InProgress = ({setModalType}: InProgressPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const inProgressList = useSelector<RootStateType, TaskType[]>(state => state.tasks.inProgress)

  const toggleContainer = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="in-progress">
      <div className="application-content in-progress-box">
        <div className="box">
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
        <div className="plus-icon" onClick={() => setModalType(ShowModalEnumType.IN_PROGRESS)}><AddCircleOutlineIcon /></div>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {
          inProgressList.map(task => {
            return (
              <div key={task.id} className="task-item">
                <input type="checkbox" />
                <p>{task.name}</p>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default InProgress;
