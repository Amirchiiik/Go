import { useState } from 'react';
import './show-modal.css';
import { useDispatch } from 'react-redux';
import { addTaskTC } from '../../state/tasks-reducer';

export enum ShowModalEnumType {
  NONE = 'none',
  CLOSED = '3',
  IN_PROGRESS = '2',
  TO_DO = '1',
}

type ShowModalPropsType = {
  spaceId: number;
  modalType: ShowModalEnumType;
  setModalType: (type: ShowModalEnumType) => void;
};

const ShowModal = ({ spaceId, modalType, setModalType }: ShowModalPropsType) => {
  const dispatch = useDispatch<any>();
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const task = {
      id: Number(spaceId),
      status: modalType,
      name: newTitle,
      text: newText,
    };

    dispatch(addTaskTC(task));
    handleClose();
  };

  const handleClose = () => {
    setNewTitle('');
    setNewText('');
    setModalType(ShowModalEnumType.NONE);
  };

  return (
    <div
      className={
        modalType !== ShowModalEnumType.NONE
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
