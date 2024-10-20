import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { addCurrentTaskAC, TaskType } from '../../state/tasks-reducer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ModalEnumType, StatusEnumType } from '../show-modal/ShowModal';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';


type InProgressPropsType = {
  setStatusType: (statusType: StatusEnumType) => void;
  setModalType: (modalType: ModalEnumType) => void;
};

const InProgress = ({ setStatusType, setModalType }: InProgressPropsType) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const inProgressList = useSelector<RootStateType, TaskType[]>(
    (state) => state.tasks.inProgress
  );
  const dispatch = useDispatch();

  const handleShowEditModal = (task: TaskType) => {
    setStatusType(StatusEnumType.CLOSED);
    setModalType(ModalEnumType.EDIT_MODAL);
  };

  const handleShowInfoModal = (task: TaskType) => {
    setStatusType(StatusEnumType.IN_PROGRESS);
    setModalType(ModalEnumType.INFO_MODAL);
  }

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
        <div
          className="plus-icon"
          onClick={() => setStatusType(StatusEnumType.IN_PROGRESS)}
        >
          <AddCircleOutlineIcon />
        </div>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {inProgressList.map((task) => {
          return (
            <div key={task.id} className="task-item">
              <>
              <input type="checkbox" />
              <p
                onClick={() => {
                  dispatch(addCurrentTaskAC(task));
                  handleShowInfoModal(task);
                }}
              >
                {task.name}
              </p>
              </>
              <button className="edit-icon" onClick={() => {
                  dispatch(addCurrentTaskAC(task));
                  handleShowEditModal(task);
                }}>
              <EditIcon />
            </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InProgress;
