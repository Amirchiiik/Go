import { useLocation, useNavigate } from 'react-router-dom';
import './space.css';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteSpaceTC, SpaceType } from '../../state/space-reducer';

type SpacePropsType = {
  space: SpaceType;
  isEdit: boolean;
};

const Space = ({ space, isEdit }: SpacePropsType) => {
  const dispatch = useDispatch<any>(); 
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const handleDeleteSpace = () => {
    dispatch(deleteSpaceTC(space.id));
  };


  return (
    <li
      className={path === `/${space}` ? 'space-list-item active' : 'space-list-item'}
      onClick={() => navigate(`/${space.name}`)}
    >
      <div className="">
        <span
          className="icon"
          style={{ backgroundColor: space.colour }}
        >
          {space.name[0]}
        </span>
        {space.name}
      </div>

      {isEdit && <div className="edit-button" onClick={handleDeleteSpace}><DeleteIcon /></div>}
    </li>
  );
};

export default Space;
