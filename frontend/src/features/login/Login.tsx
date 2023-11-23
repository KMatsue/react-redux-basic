import Button from "@mui/material/Button"

import styles from "./Login.module.css"

import {
  editUserName,
  editPassword,
  toggleMode,
  fetchAsyncLogin,
  fetchAsyncRegister,
  selectAuthen,
  selectIsLoginView,
} from "./loginSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"

const Login = () => {
  const dispatch = useAppDispatch()
  const authen = useAppSelector(selectAuthen)
  const isLoginView = useAppSelector(selectIsLoginView)
  const btnDisabler = authen.username === "" || authen.password === ""

  const login = async () => {
    if (isLoginView) {
      await dispatch(fetchAsyncLogin(authen))
    } else {
      const result = await dispatch(fetchAsyncRegister(authen))

      if (fetchAsyncRegister.fulfilled.match(result)) {
        await dispatch(fetchAsyncLogin(authen))
      }
    }
  }

  return (
    <div className={styles.containerLogin}>
      <div className={styles.appLogin}>
        <h1>{isLoginView ? "Login" : "Register"}</h1>
        <span>Username</span>
        <input
          type="text"
          className={styles.inputLog}
          name="username"
          placeholder=""
          onChange={(e) => dispatch(editUserName(e.target.value))}
          required
        />
        <span>Password</span>
        <input
          type="password"
          className={styles.inputLog}
          name="password"
          placeholder=""
          onChange={(e) => dispatch(editPassword(e.target.value))}
          required
        />
        <div className={styles.switch}>
          <Button
            variant="contained"
            disabled={btnDisabler}
            color="primary"
            onClick={login}
          >
            {isLoginView ? "Login" : "Create"}
          </Button>
        </div>
        <span
          className={styles.switchText}
          onClick={() => dispatch(toggleMode())}
        >
          {isLoginView ? "Create Account ?" : "Back to Login"}
        </span>
      </div>
    </div>
  )
}

export default Login
