import { Link, useLocation, useNavigate } from 'react-router-dom';
import './navbar.css';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import Space from '../space/Space';
import { addSpaceTC, SpaceType } from '../../state/space-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../../state/store';
import EditSpace from '../space/EditSpace';

const Navbar = () => {
  const dispatch = useDispatch<any>();
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [spaceName, setSpaceName] = useState('');

  const spaces = useSelector<RootStateType, SpaceType[]>(
    (state) => state.spaceData.spaces
  );

  const handleAddNewSpace = (e: any) => {
    e.preventDefault();
    setIsInputVisible((prev) => !prev);
    dispatch(addSpaceTC(spaceName));
    setSpaceName('');
  };

  const handleEditSpace = (e: any) => {
    e.preventDefault();
    setIsEdit((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="all-spaces">
          <div className="navbar-title-container">
            <p className="title">Spaces</p>
            <button onClick={handleEditSpace}>
              <EditIcon />
            </button>
          </div>

          <ul>
            {spaces.map((space) =>
              isEdit ? (
                <EditSpace key={space.id} space={space} setIsEdit={setIsEdit}/>
              ) : (
                <Space key={space.id} space={space} />
              )
            )}
            {isInputVisible && (
              <li className="list-input">
                <input
                  type="text"
                  placeholder="Enter new space name"
                  value={spaceName}
                  onChange={(e: any) => setSpaceName(e.target.value)}
                />
                <button onClick={handleAddNewSpace}>Add</button>
              </li>
            )}
          </ul>
        </div>
        {!isInputVisible && (
          <button
            onClick={() => setIsInputVisible((prev) => !prev)}
            className="add-button"
          >
            + Add Space
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
