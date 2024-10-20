import { useState } from 'react';
import './show-modal.css';
import { useDispatch } from 'react-redux';
import { addTaskTC } from '../../state/tasks-reducer';

export enum StatusEnumType {
  NONE = 'none',
  CLOSED = '3',
  IN_PROGRESS = '2',
  TO_DO = '1',
}

export enum ModalEnumType {
    INFO_MODAL = 'info-modal',
    SHOW_MODAL = 'show-modal',
    EDIT_MODAL = 'edit-modal',
}

type ShowModalPropsType = {
  spaceId: number;
  statusType: StatusEnumType;
  setStatusType: (type: StatusEnumType) => void;
};

const ShowModal = ({ spaceId, statusType, setStatusType }: ShowModalPropsType) => {
  const dispatch = useDispatch<any>();
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const task = {
      id: Number(spaceId),
      status: statusType,
      name: newTitle,
      text: newText,
    };

    dispatch(addTaskTC(task));
    handleClose();
  };

  const handleClose = () => {
    setNewTitle('');
    setNewText('');
    setStatusType(StatusEnumType.NONE);
  };

  return (
    <div
      className={
        statusType !== StatusEnumType.NONE
          ? 'show-modal active'
          : 'show-modal'
      }
    >
      <div className="show-modal-overlay" onClick={handleClose}></div>
      <div className="show-modal-container">
        <form onSubmit={handleSubmit}>
          <div className="task-title">
            <label htmlFor="task-name">Task Name:</label>
            <input
              type="text"
              id="task-name"
              name="task-name"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              required
            />
          </div>

          <div className="task-description">
            <label htmlFor="task-text">Task Text:</label>
            <textarea
              id="task-text"
              name="task-text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              required
            ></textarea>
          </div>

          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default ShowModal;
