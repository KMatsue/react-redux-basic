import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store"
import App from "./App"
import "./index.css"

import Login from "./features/login/Login"
import { Route, BrowserRouter, Routes } from "react-router-dom"
import Basic from "./features/basic/Basic"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/tasks" element={<App />} />
          <Route path="/basic" element={<Basic />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
