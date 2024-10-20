import { useLocation, useNavigate } from 'react-router-dom';
import './space.css';

import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { deleteSpaceTC, SpaceType } from '../../state/space-reducer';
import { getTasksTC } from '../../state/tasks-reducer';

type SpacePropsType = {
  space: SpaceType;
};

const Space = ({ space }: SpacePropsType) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const path = useLocation().pathname;


  const handleNavigate = () => {
    dispatch(getTasksTC(space.id));
    navigate(`/${space.name}`);
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
        <p>{space.name}</p>
      </div>
    </li>
  );
};

export default Space;
