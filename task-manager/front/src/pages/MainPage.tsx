import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import Closed from '../components/closed/Closed';
import InProgress from '../components/in-progress/InProgress';
import ToDo from '../components/to-do/ToDo';
import ShowModal, {
  ModalEnumType,
  StatusEnumType,
} from '../components/show-modal/ShowModal';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../state/store';
import { SpaceType } from '../state/space-reducer';
import { getTasksTC } from '../state/tasks-reducer';
import InfoModal from '../components/show-modal/InfoModal';
import EditModal from '../components/show-modal/EditModal';

const MainPage = () => {
  const { spaceName } = useParams();
  const { taskId} = useParams();
  const dispatch = useDispatch<any>();
  console.log('space name: ' + spaceName);
  let defaultSpace = useSelector<RootStateType, SpaceType>(
    (state) =>
      state.spaceData.spaces.find((space) => space.name === spaceName) ||
      ({} as SpaceType)
  );

  const [statusType, setStatusType] = useState<StatusEnumType>(
    StatusEnumType.NONE
  );
  const [modalType, setModalType] = useState<ModalEnumType>(
    ModalEnumType.SHOW_MODAL
  );

  useEffect(() => {
    if (defaultSpace.id) {
      dispatch(getTasksTC(Number(defaultSpace.id)));
    }
  });

  return (
    <div className="page main-page">
      <Navbar />

      <div className="all-lists">
        <Closed setStatusType={setStatusType} setModalType={setModalType}/>
        <InProgress setStatusType={setStatusType} setModalType={setModalType}/>
        <ToDo setStatusType={setStatusType} setModalType={setModalType}/>
      </div>

      {modalType === ModalEnumType.SHOW_MODAL ? (
        <ShowModal
          statusType={statusType}
          spaceId={defaultSpace.id}
          setStatusType={setStatusType}
        />
      ) : modalType === ModalEnumType.INFO_MODAL ? (
        <InfoModal
          statusType={statusType}
          spaceId={defaultSpace.id}
          setStatusType={setStatusType}
        />
      ) : modalType === ModalEnumType.EDIT_MODAL ? (
        <EditModal
          taskId={Number(taskId)}
          statusType={statusType}
          spaceId={defaultSpace.id}
          setStatusType={setStatusType}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MainPage;
