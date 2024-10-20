import React, { useState } from 'react';
import './to-do.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { TaskType } from '../../state/tasks-reducer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ShowModalEnumType } from '../show-modal/ShowModal';

type ToDoPropsType = {
  setModalType: (modalType: ShowModalEnumType) => void;
}

const ToDo = ({setModalType}: ToDoPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const todoList = useSelector<RootStateType, TaskType[]>(
    (state) => state.tasks.toDo
  );

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
          onClick={() => setModalType(ShowModalEnumType.TO_DO)}
        >
          <AddCircleOutlineIcon />
        </div>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {todoList.map((todo) => {
          return (
            <div key={todo.id} className="task-item">
              <input type="checkbox" />
              <p>{todo.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToDo;
