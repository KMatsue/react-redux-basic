import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RootState } from "../../app/store"

const apiUrl = "https://jsonplaceholder.typicode.com/users"

export interface fetchUsersState {
  users: []
  status: "idle" | "loading" | "failed"
}

export type User = { id: number; email: string }

const initialState: fetchUsersState = {
  users: [],
  status: "idle",
}

export const fetchAsyncGet = createAsyncThunk("fetch/get", async () => {
  const response = await axios.get(apiUrl)

  return response.data
})

const fetchSlice = createSlice({
  name: "fetch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGet.fulfilled, (state, action) => {
      state.status = "idle"
      return { ...state, users: action.payload }
    })
  },
})

export const selectUsers = (state: RootState) => state.fetch.users
export default fetchSlice.reducer
