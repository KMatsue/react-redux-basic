import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import counterReducer from "../features/basic/counter/counterSlice"
import taskBasicReducer from "../features/basic/task_basic/taskBasicSlice"
import fetchBasicReducer from "../features/basic/fetch_basic/fetchBasicSlice"
import loginReducer from "../features/login/loginSlice"
import taskReducer from "../features/task/taskSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    taskBasic: taskBasicReducer,
    fetchBasic: fetchBasicReducer,
    login: loginReducer,
    task: taskReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
