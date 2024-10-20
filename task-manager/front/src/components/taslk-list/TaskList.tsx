import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { TaskType } from '../../state/tasks-reducer';
import { ModalEnumType, StatusEnumType } from '../show-modal/ShowModal';
import { useNavigate } from 'react-router-dom';

type TaskListPropsType = {
  statusType: StatusEnumType;
  setStatusType: (statusType: StatusEnumType) => void;
  setModalType: (modalType: ModalEnumType) => void;
};

const TaskList = ({ statusType, setStatusType, setModalType }: TaskListPropsType) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // Selector based on status type
  const taskList = useSelector<RootStateType, TaskType[]>(
    (state) => {
      switch (statusType) {
        case StatusEnumType.IN_PROGRESS:
          return state.tasks.inProgress;
        case StatusEnumType.TO_DO:
          return state.tasks.toDo;
        case StatusEnumType.CLOSED:
          return state.tasks.closed;
        default:
          return [];
      }
    }
  );

  const handleShowEditModal = (task: TaskType) => {
    setModalType(ModalEnumType.EDIT_MODAL);
  };

  const toggleContainer = () => {
    setIsOpen((prev) => !prev);
  };

  const renderTitle = () => {
    switch (statusType) {
      case StatusEnumType.IN_PROGRESS:
        return (
          <>
            <RadioButtonCheckedIcon /> In Progress
          </>
        );
      case StatusEnumType.TO_DO:
        return (
          <>
            <RadioButtonUncheckedIcon /> To Do
          </>
        );
      case StatusEnumType.CLOSED:
        return (
          <>
            <CheckCircleIcon /> Closed
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className={statusType.toLowerCase()}>
      <div className={`application-content ${statusType.toLowerCase()}-box`}>
        <div className="box">
          <ArrowRightIcon
            style={{
              transition: 'transform 0.3s',
              transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            }}
            onClick={toggleContainer}
          />
          <p className={`${statusType.toLowerCase()}-title`}>
            {renderTitle()}
          </p>
        </div>
        <div className="plus-icon" onClick={() => setStatusType(statusType)}>
          <AddCircleOutlineIcon />
        </div>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {taskList.map((task) => (
          <div key={task.id} className="task-item">
            <input type="checkbox" checked={statusType === StatusEnumType.CLOSED} />
            <p
              onClick={() => {
                navigate('/' + task.id);
                handleShowEditModal(task);
              }}
            >
              {task.name}
            </p>
            {statusType !== StatusEnumType.CLOSED && (
              <button className="edit-icon" onClick={() => {
                navigate('/' + task.id);
                handleShowEditModal(task);
              }}>
                <EditIcon />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
