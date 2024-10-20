import { useEffect, useState } from 'react';
import './show-modal.css';
import { useDispatch, useSelector } from 'react-redux';
import { editTaskTC, TaskType } from '../../state/tasks-reducer'; // Update import if needed
import { StatusEnumType } from './ShowModal';
import { RootStateType } from '../../state/store';

type InfoModalPropsType = {
  spaceId: number;
  statusType: StatusEnumType;
  setStatusType: (type: StatusEnumType) => void;
};

const InfoModal = ({
  spaceId,
  statusType,
  setStatusType,
}: InfoModalPropsType) => {
  const dispatch = useDispatch<any>();
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  
  const currentTask = useSelector<RootStateType, TaskType | undefined>(
    (state) => state.tasks.currentTask
  );

  useEffect(() => {
    if (currentTask) {
      setNewTitle(currentTask.name || "");
      setNewText(currentTask.text || "");
    }
  }, [currentTask]); 

  if(!currentTask) {
    return null; 
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const task = {
      id: currentTask.id,
      status: statusType,
      name: newTitle,
      text: newText,
    };

    dispatch(editTaskTC(spaceId, task)); // Call editTaskTC instead
    handleClose();
  };

  const handleClose = () => {
    setNewTitle('');
    setNewText('');
    setStatusType(StatusEnumType.NONE);
  };

  if (!currentTask) {
    return null; // Prevent rendering if no current task
  }

  return (
    <div className={statusType !== StatusEnumType.NONE ? 'show-modal active' : 'show-modal'}>
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
              disabled
            />
          </div>

          <div className="task-description">
            <label htmlFor="task-text">Task Text:</label>
            <textarea
              id="task-text"
              name="task-text"
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              disabled
            ></textarea>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InfoModal;
