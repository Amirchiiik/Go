import React, { useState } from 'react';
import './to-do.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import {
  addCurrentTaskAC,
  changeStatusTC,
  TaskType,
} from '../../state/tasks-reducer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ModalEnumType, StatusEnumType } from '../show-modal/ShowModal';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { SpaceType } from '../../state/space-reducer';

type ToDoPropsType = {
  setStatusType: (statusType: StatusEnumType) => void;
  setModalType: (modalType: ModalEnumType) => void;
};

const ToDo = ({ setStatusType, setModalType }: ToDoPropsType) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const todoList = useSelector<RootStateType, TaskType[]>(
    (state) => state.tasks.toDo
  );
  const { spaceName } = useParams();
  let defaultSpace = useSelector<RootStateType, SpaceType>(
    (state) =>
      state.spaceData.spaces.find((space) => space.name === spaceName) ||
      ({} as SpaceType)
  );

  const handleShowInfoModal = (task: TaskType) => {
    setStatusType(StatusEnumType.IN_PROGRESS);
    setModalType(ModalEnumType.INFO_MODAL);
  };

  const handleShowEditModal = (task: TaskType) => {
    setStatusType(StatusEnumType.TO_DO);
    setModalType(ModalEnumType.EDIT_MODAL);
  };

  const handleCheckboxChange = (task: TaskType) => {
    dispatch(changeStatusTC(defaultSpace.id, task.id, StatusEnumType.IN_PROGRESS));
    window.location.reload();

  };

  const toggleContainer = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="to-do">
      <div className="application-content to-do-box">
        <div className="box">
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
        <div
          className="plus-icon"
          onClick={() => setStatusType(StatusEnumType.TO_DO)}
        >
          <AddCircleOutlineIcon />
        </div>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {todoList.map((task) => {
          return (
            <div key={task.id} className="task-item">
              <>
                <input
                  type="checkbox"
                  onChange={() => handleCheckboxChange(task)}
                />
                <p
                  onClick={() => {
                    dispatch(addCurrentTaskAC(task));
                    handleShowInfoModal(task);
                  }}
                >
                  {task.name}
                </p>
              </>
              <button
                className="edit-icon"
                onClick={() => {
                  dispatch(addCurrentTaskAC(task));
                  handleShowEditModal(task);
                }}
              >
                <EditIcon />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;
