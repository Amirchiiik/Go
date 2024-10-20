import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Closed from '../components/closed/Closed';
import InProgress from '../components/in-progress/InProgress';
import ToDo from '../components/to-do/ToDo';
import ShowModal, {
  ShowModalEnumType,
} from '../components/show-modal/ShowModal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../state/store';
import { SpaceType } from '../state/space-reducer';
import { getTasksTC } from '../state/tasks-reducer';

const MainPage = () => {
  const { spaceName } = useParams();
  const dispatch = useDispatch<any>();
  console.log("space name: " + spaceName);
  let defaultSpace = useSelector<RootStateType, SpaceType>(
    (state) => state.spaceData.spaces.find((space) => space.name === spaceName) || {} as SpaceType
  );

  const [modalType, setModalType] = useState<ShowModalEnumType>(
    ShowModalEnumType.NONE
  );

  useEffect(() => {
    if(defaultSpace.id) {
      dispatch(getTasksTC(Number(defaultSpace.id)));
    }
  })


  return (
    <div className="page main-page">
      <Navbar />

      <div className="all-lists">
        <Closed setModalType={setModalType} />
        <InProgress setModalType={setModalType} />
        <ToDo setModalType={setModalType} />
      </div>

      <ShowModal
        modalType={modalType}
        spaceId={defaultSpace.id}
        setModalType={setModalType}
      />
    </div>
  );
};

export default MainPage;
