import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { spaceReducer } from "./space-reducer";
import { tasksReducer } from "./tasks-reducer";

const rootReducer = combineReducers({
    spaceData: spaceReducer,
    tasks: tasksReducer,
})

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>