import axios from 'axios';
import { Dispatch } from 'redux';
import { mainURL } from '../config';
import { StatusEnumType } from '../components/show-modal/ShowModal';

export enum TasksReducerEnumType {
  SET_TASKS = 'SET_TASKS',
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  EDIT_TASK = 'EDIT_TASK',
  ADD_CURRENT_TASK = 'ADD_CURRENT_TASK',
}

export type TaskType = {
  id: number;
  name: string;
  text: string;
  status: StatusEnumType;
};

export type TasksStateType = {
  toDo: TaskType[];
  inProgress: TaskType[];
  closed: TaskType[];
  currentTask?: TaskType;
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
  status: StatusEnumType;
};

export type addCurrentTaskActionType = {
  type: TasksReducerEnumType.ADD_CURRENT_TASK;
  task: TaskType;
};

export type EditTaskActionType = {
  type: TasksReducerEnumType.EDIT_TASK;
  task: TaskType;
};

type TasksActionType =
  | SetTasksActionType
  | AddTaskActionType
  | addCurrentTaskActionType
  | EditTaskActionType;

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
          action.status === StatusEnumType.TO_DO
            ? [...state.toDo, action.task]
            : state.toDo,
        inProgress:
          action.status === StatusEnumType.IN_PROGRESS
            ? [...state.inProgress, action.task]
            : state.inProgress,
        closed:
          action.status === StatusEnumType.CLOSED
            ? [...state.closed, action.task]
            : state.closed,
      };
      case TasksReducerEnumType.EDIT_TASK:
        return {
         ...state,
          toDo: state.toDo.map((t) =>
            t.id === action.task.id? action.task : t
          ),
          inProgress: state.inProgress.map((t) =>
            t.id === action.task.id? action.task : t
          ),
          closed: state.closed.map((t) =>
            t.id === action.task.id? action.task : t
          ),
        };
    case TasksReducerEnumType.ADD_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.task,
      };
    default:
      return state;
  }
};

export const setTasksAC = (tasks: TaskType[]): TasksActionType => {
  return { type: TasksReducerEnumType.SET_TASKS, tasks };
};

export const addCurrentTaskAC = (task: TaskType) => {
  return { type: TasksReducerEnumType.ADD_CURRENT_TASK, task };
};

export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: TasksReducerEnumType.ADD_TASK, task, status: task.status };
};

export const editTaskAC = (task: TaskType): EditTaskActionType => {
  return {
    type: TasksReducerEnumType.EDIT_TASK,
    task,
  };
};

export const getTasksTC = (spaceId: number) => {
  console.log('Fetching tasks for space', spaceId);
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`/spaces/${spaceId}/applications/`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

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

export const editTaskTC = (spaceId: number, task: TaskType) => {
  console.log('adding task', task);
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.put(
        `/spaces/${spaceId}/applications/${task.id}`,
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
      dispatch(editTaskAC(response.data));
    } catch (error) {
      console.error('Error adding task:', error);
      return;
    }
  };
};
