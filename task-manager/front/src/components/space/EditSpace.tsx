import { useLocation, useNavigate } from 'react-router-dom';
import './space.css';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteSpaceTC, editSpaceTC, SpaceType } from '../../state/space-reducer';
import { getTasksTC } from '../../state/tasks-reducer';
import { useState } from 'react';

type EditSpacePropsType = {
  space: SpaceType;
  setIsEdit: (edit: boolean) => void;
};

const EditSpace = ({ space, setIsEdit }: EditSpacePropsType) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [spaceName, setSpaceName] = useState(space.name);

  const handleDeleteSpace = () => {
    dispatch(deleteSpaceTC(space.id));
  };

  const handleNavigate = () => {
    dispatch(getTasksTC(space.id));
    navigate(`/${space.name}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      
      spaceName.trim() && dispatch(editSpaceTC(space.id, spaceName)) 

      setIsEdit(false); 
    }
  };

  return (
    <li
      className={
        path === `/${space.name}` ? 'space-list-item active' : 'space-list-item'
      }
      onClick={handleNavigate}
    >
      <div className="space-name">
        <span className="icon" style={{ backgroundColor: space.colour }}>
          {space.name[0]}
        </span>
        <input
          type="text"
          value={spaceName}
          onChange={(e: any) => setSpaceName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="edit-button" onClick={handleDeleteSpace}>
        <DeleteIcon />
      </div>
    </li>
  );
};

export default EditSpace;
