import axios from 'axios';
import { Dispatch } from 'redux';
import { mainURL } from '../config';
import { ShowModalEnumType } from '../components/show-modal/ShowModal';

export enum TasksReducerEnumType {
  SET_TASKS = 'SET_TASKS',
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  EDIT_TASK = 'EDIT_TASK',
}

export type TaskType = {
  id: number;
  name: string;
  text: string;
  status: ShowModalEnumType;
};

export type TasksStateType = {
  toDo: TaskType[];
  inProgress: TaskType[];
  closed: TaskType[];
};

const initialState: TasksStateType = {
  toDo: [],
  inProgress: [],
  closed: [],
};

export type SetTasksActionType = {
  type: TasksReducerEnumType.SET_TASKS;
  tasks: TaskType[];
};

export type AddTaskActionType = {
  type: TasksReducerEnumType.ADD_TASK;
  task: TaskType;
  status: ShowModalEnumType;
};

type TasksActionType = SetTasksActionType | AddTaskActionType;

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: TasksActionType
) => {
  switch (action.type) {
    case TasksReducerEnumType.SET_TASKS:
      return {
        ...state,
        toDo: action.tasks.filter((t) => t.status === '1'),
        inProgress: action.tasks.filter((t) => t.status === '2'),
        closed: action.tasks.filter((t) => t.status === '3'),
      };
    case TasksReducerEnumType.ADD_TASK:
      return {
        ...state,
        toDo:
          action.status === ShowModalEnumType.TO_DO
            ? [...state.toDo, action.task]
            : state.toDo,
        inProgress:
          action.status === ShowModalEnumType.IN_PROGRESS
            ? [...state.inProgress, action.task]
            : state.inProgress,
        closed:
          action.status === ShowModalEnumType.CLOSED
            ? [...state.closed, action.task]
            : state.closed,
      };
    default:
      return state;
  }
};

export const setTasksAC = (tasks: TaskType[]): TasksActionType => {
  return { type: TasksReducerEnumType.SET_TASKS, tasks };
};

export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: TasksReducerEnumType.ADD_TASK, task, status: task.status };
};

export const getTasksTC = (spaceId: number) => {
  console.log('Fetching tasks for space', spaceId);
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(
        `/spaces/${spaceId}/applications/`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      console.log('response tasks: ', response.data);
      dispatch(setTasksAC(response.data));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      if (axios.isAxiosError(error)) {
        console.error('Error details:', error.response?.data);
      }
    }
  };
};

export const addTaskTC = (task: TaskType) => {
  console.log('adding task', task);
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `/spaces/${task.id}/applications`,
        {
          name: task.name,
          text: task.text,
          status: task.status,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('response add task: ', response.data);
      dispatch(addTaskAC(response.data));
    } catch (error) {
      console.error('Error adding task:', error);
      return;
    }
  };
};
