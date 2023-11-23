import React, { useState } from "react"
import { useAppDispatch } from "../../../app/hooks"
import { newTask } from "./taskBasicSlice"

const TaskBasicInput = () => {
  const dispatch = useAppDispatch()
  const [editTitle, setEditTitle] = useState("")
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditTitle(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(newTask(editTitle))
    setEditTitle("")
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={editTitle} onChange={handleTitleChange} />
      <button>New</button>
    </form>
  )
}

export default TaskBasicInput
