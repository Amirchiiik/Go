import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import { spaceReducer } from "./space-reducer";

const rootReducer = combineReducers({
    spaceData: spaceReducer,
})

export const store = createStore(rootReducer, undefined, applyMiddleware(thunk))

export type RootStateType = ReturnType<typeof rootReducer>