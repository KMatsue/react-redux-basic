import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
// import { fetchCount } from "./counterAPI"

export interface TaskState {
  idCount: number
  tasks: Array<Task>
  status: "idle" | "loading" | "failed"
}

export type Task = { id: number; title: string; completed: boolean }

const initialState: TaskState = {
  idCount: 3,
  tasks: [
    { id: 3, title: "TASK C", completed: false },
    { id: 2, title: "TASK B", completed: true },
    { id: 1, title: "TASK A", completed: false },
  ],
  status: "idle",
}

// export const incrementAsync = createAsyncThunk(
//   "counter/fetchCount",
//   async (amount: number) => {
//     const response = await fetchCount(amount)
//     return response.data
//   },
// )

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    newTask: (state, action: PayloadAction<string>) => {
      state.idCount++
      const newItem = {
        id: state.idCount,
        title: action.payload,
        completed: false,
      }
      state.tasks = [newItem, ...state.tasks]
    },
    completeTask: (state, action: PayloadAction<Task>) => {
      const task = state.tasks.find((t) => t.id === action.payload.id)
      if (task) {
        task.completed = !task.completed
      }
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    deleteTask: (state, action: PayloadAction<Task>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload.id)
    },
  },
})

export const { newTask, completeTask, deleteTask } = taskSlice.actions

export const selectTasks = (state: RootState) => state.task.tasks

// We can also write thunks by hand, which may contain both sync and async logic.

export default taskSlice.reducer
