import React, { useState } from 'react';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import { addCurrentTaskAC, changeStatusTC, deleteTaskTC, TaskType } from '../../state/tasks-reducer';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { ModalEnumType, StatusEnumType } from '../show-modal/ShowModal';
import { useNavigate, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { SpaceType } from '../../state/space-reducer';

type ClosedPropsType = {
  setStatusType: (statusType: StatusEnumType) => void;
  setModalType: (modalType: ModalEnumType) => void;
}

const Closed = ({setStatusType, setModalType}: ClosedPropsType) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const closedList =useSelector<RootStateType, TaskType[]>(state => state.tasks.closed);

  const { spaceName } = useParams();
  let defaultSpace = useSelector<RootStateType, SpaceType>(
    (state) =>
      state.spaceData.spaces.find((space) => space.name === spaceName) ||
      ({} as SpaceType)
  );

  const handleShowInfoModal = (task: TaskType) => {
    setStatusType(StatusEnumType.IN_PROGRESS);
    setModalType(ModalEnumType.INFO_MODAL);
  }

  const handleShowEditModal = (task: TaskType) => {
    setStatusType(StatusEnumType.CLOSED);
    setModalType(ModalEnumType.EDIT_MODAL);
  };

  const handleCheckboxChange = (task: TaskType) => {
    // Dispatch action to change status to IN_PROGRESS (status "2")
    dispatch(deleteTaskTC(defaultSpace.id, task.id))
    window.location.reload();
  };

  const toggleContainer = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <><div className="closed">
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
        <div className="plus-icon" onClick={() => setStatusType(StatusEnumType.CLOSED)}><AddCircleOutlineIcon /></div>
      </div>
      <div className={`moving-container ${isOpen ? 'open' : ''}`}>
        {
          closedList.map(task => {
            return (
              <div key={task.id} className="task-item">
                              <>
              <input type="checkbox" onChange={() => handleCheckboxChange(task)}/>
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

            )
          })
        }
      </div>
    </div></>
  );
};

export default Closed;
