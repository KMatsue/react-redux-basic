import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../../app/store"
import axios from "axios"

const apiUrl = "http://localhost:8000/"
const token = localStorage.localJWT

export interface loginState {
  authen: { username: string; password: string }
  isLoginView: boolean
  profile: { id: number; username: string }
  status: "idle" | "loading" | "failed"
}

export type TaskBasic = { id: number; title: string; completed: boolean }

const initialState: loginState = {
  authen: { username: "", password: "" },
  isLoginView: true,
  profile: { id: 0, username: "" },
  status: "idle",
}

export const fetchAsyncLogin = createAsyncThunk(
  "login/post",
  async (auth: any) => {
    const response = await axios.post(`${apiUrl}auth/jwt/create`, auth, {
      headers: { "Content-Type": "application/json" },
    })

    return response.data
  },
)

export const fetchAsyncRegister = createAsyncThunk(
  "login/register",
  async (auth: any) => {
    const response = await axios.post(`${apiUrl}api/register/`, auth, {
      headers: { "Content-Type": "application/json" },
    })

    return response.data
  },
)

export const fetchAsyncProf = createAsyncThunk("login/get", async () => {
  const response = await axios.get(`${apiUrl}api/myself/`, {
    headers: { Authorization: `JWT ${token}` },
  })

  return response.data
})

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    editUserName: (state, action: PayloadAction<string>) => {
      state.authen.username = action.payload
    },
    editPassword: (state, action: PayloadAction<string>) => {
      state.authen.password = action.payload
    },
    toggleMode: (state) => {
      state.isLoginView = !state.isLoginView
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncLogin.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAsyncLogin.fulfilled, (state, action) => {
        state.status = "idle"
        localStorage.setItem("localJWT", action.payload.access)
        action.payload.access && (window.location.href = "/tasks")
      })
      .addCase(fetchAsyncLogin.rejected, (state) => {
        state.status = "failed"
      })
    builder
      .addCase(fetchAsyncProf.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchAsyncProf.fulfilled, (state, action) => {
        state.status = "idle"
        state.profile = action.payload
      })
      .addCase(fetchAsyncProf.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { editUserName, editPassword, toggleMode } = loginSlice.actions

export const selectAuthen = (state: RootState) => state.login.authen
export const selectIsLoginView = (state: RootState) => state.login.isLoginView
export const selectProfile = (state: RootState) => state.login.profile

export default loginSlice.reducer
