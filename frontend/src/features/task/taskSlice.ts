import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"
// import { fetchCount } from "./counterAPI"
const apiUrl = "http://localhost:8000/api/tasks/"
const token = localStorage.localJWT

export interface TaskState {
  tasks: Array<Task>
  editedTask: Task
  selectedTask: Task
  status: "idle" | "loading" | "failed"
}

export type Task = {
  id: number
  title: string
  created_at: string
  updated_at: string
}

const initialState: TaskState = {
  tasks: [
    { id: 3, title: "TASK C", created_at: "", updated_at: "" },
    { id: 2, title: "TASK B", created_at: "", updated_at: "" },
    { id: 1, title: "TASK A", created_at: "", updated_at: "" },
  ],
  editedTask: {
    id: 1,
    title: "",
    created_at: "",
    updated_at: "",
  },
  selectedTask: {
    id: 1,
    title: "",
    created_at: "",
    updated_at: "",
  },
  status: "idle",
}

export const fetchAsyncTask = createAsyncThunk("task/get", async () => {
  const response = await axios.get(apiUrl, {
    headers: { Authrization: `JWT ${token}` },
  })
  return response.data
})

export const createAsyncTask = createAsyncThunk("task/post", async (task) => {
  const response = await axios.post(apiUrl, task, {
    headers: {
      "Content-Type": "application/json",
      Authrization: `JWT ${token}`,
    },
  })
  return response.data
})
export const updateAsyncTask = createAsyncThunk(
  "task/put",
  async (task: Task) => {
    const response = await axios.put(`${apiUrl}${task.id}`, task, {
      headers: {
        "Content-Type": "application/json",
        Authrization: `JWT ${token}`,
      },
    })
    return response.data
  },
)

export const deleteAsyncTask = createAsyncThunk(
  "task/delete",
  async (id: number) => {
    await axios.delete(`${apiUrl}${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authrization: `JWT ${token}`,
      },
    })
    return id
  },
)

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    editTask: (state, action: PayloadAction<Task>) => {
      state.editedTask = action.payload
    },
    selectTask: (state, action: PayloadAction<Task>) => {
      state.selectedTask = action.payload
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncTask.fulfilled, (state, action) => {
      state.status = "idle"
      return {
        ...state,
        tasks: action.payload,
      }
    })
    builder.addCase(createAsyncTask.fulfilled, (state, action) => {
      state.status = "idle"
      return {
        ...state,
        tasks: [action.payload, ...state.tasks],
      }
    })
    builder.addCase(updateAsyncTask.fulfilled, (state, action) => {
      state.status = "idle"
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
        selectedTask: action.payload,
      }
    })
    builder.addCase(
      deleteAsyncTask.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.status = "idle"
        return {
          ...state,
          tasks: state.tasks.filter((t) => t.id !== action.payload),
          selectedTask: { id: 0, title: "", created_at: "", updated_at: "" },
        }
      },
    )
  },
})

export const { editTask, selectTask } = taskSlice.actions

export const selectedTasks = (state: RootState) => state.task.selectedTask
export const editedTasks = (state: RootState) => state.task.editedTask
export const selectTasks = (state: RootState) => state.task.tasks

// We can also write thunks by hand, which may contain both sync and async logic.

export default taskSlice.reducer
