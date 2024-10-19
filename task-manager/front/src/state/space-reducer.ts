import axios from 'axios';
import { Dispatch } from 'redux';
import { mainURL } from '../config';

export enum SpaceReducerEnumType {
  SET_SPACES = 'SET_SPACES',
  ADD_SPACE = 'ADD_SPACE',
  EDIT_SPACE = 'EDIT_SPACE',
  DELETE_SPACE = 'DELETE_SPACE',
}

export type SpaceType = {
  id: number;
  name: string;
  colour: string;
};

export type SpaceStateType = {
  spaces: SpaceType[];
};

const initialState: SpaceStateType = {
  spaces: [],
};

export type SetSpacesActionType = {
  type: SpaceReducerEnumType.SET_SPACES;
  spaces: SpaceType[];
};

export type AddSpaceActionType = {
  type: SpaceReducerEnumType.ADD_SPACE;
  space: SpaceType;
};

export type EditSpaceActionType = {
  type: SpaceReducerEnumType.EDIT_SPACE;
  spaceId: number;
};

export type deleteSpaceActionType = {
  type: SpaceReducerEnumType.DELETE_SPACE;
  spaceId: number;
};

export type SpaceActionType =
  | AddSpaceActionType
  | SetSpacesActionType
  | deleteSpaceActionType
  | EditSpaceActionType;

export const spaceReducer = (
  state: SpaceStateType = initialState,
  action: SpaceActionType
) => {
  switch (action.type) {
    case SpaceReducerEnumType.SET_SPACES:
      return { ...state, spaces: action.spaces };
    case SpaceReducerEnumType.ADD_SPACE:
      return { ...state, spaces: [...state.spaces, action.space] };
    case SpaceReducerEnumType.DELETE_SPACE:
      return {
        ...state,
        spaces: state.spaces.filter((s) => s.id !== action.spaceId),
      };

    // case SpaceReducerEnumType.EDIT_SPACE:
    //     return state;
    // case SpaceReducerEnumType.DELETE_SPACE:
    //     return state;
    default:
      return state;
  }
};

export const setSpacesAC = (spaces: SpaceType[]) => {
  return { type: SpaceReducerEnumType.SET_SPACES, spaces };
};

export const addSpaceAC = (space: SpaceType) => {
  return { type: SpaceReducerEnumType.ADD_SPACE, space };
};

export const EditSpaceActionType = (spaceId: number) => {
  return { type: SpaceReducerEnumType.EDIT_SPACE, spaceId };
};

export const deleteSpaceAC = (spaceId: number) => {
  return { type: SpaceReducerEnumType.DELETE_SPACE, spaceId };
};

export const getSpacesTC = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(mainURL + '/spaces', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('response spaces: ' + response.data);

      dispatch(setSpacesAC(response.data));
    } catch (err) {
      console.error('Error fetching spaces:', err);
    }
  };
};

export const addSpaceTC = (spaceName: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(mainURL + '/spaces', { name: spaceName }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('response add space: ' + response.data);

      dispatch(addSpaceAC(response.data));
    } catch (err) {
      console.error('Error adding space:', err);
      console.log('adding space: ' + spaceName);
    }
  };
};

export const deleteSpaceTC = (spaceId: number) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(mainURL + '/spaces/' + spaceId, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Space deleted');
      dispatch(deleteSpaceAC(spaceId));
    } catch (err) {
      console.error('Error deleting space:', err);
    }
  };
};
