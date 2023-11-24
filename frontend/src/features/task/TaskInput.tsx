import React from "react"
import styles from "./TaskInput.module.css"
import { Button } from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../app/hooks"

import {
  createAsyncTask,
  updateAsyncTask,
  editTask,
  selectEditedTask,
} from "./taskSlice"

const TaskInput: React.FC = () => {
  const dispatch = useAppDispatch()
  const editedTask = useAppSelector(selectEditedTask)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    editedTask.id === 0
      ? dispatch(editTask({ id: 0, title: e.target.value }))
      : dispatch(editTask({ id: editedTask.id, title: e.target.value }))
  }

  const isDisabled = editedTask.title.length === 0

  const createClicked = () => {
    dispatch(createAsyncTask(editedTask))
    dispatch(editTask({ id: 0, title: "" }))
  }

  const updateClicked = () => {
    dispatch(updateAsyncTask(editedTask))
    dispatch(editTask({ id: 0, title: "" }))
  }

  return (
    <div>
      <input
        type="text"
        className={styles.taskInput}
        value={editedTask.title}
        onChange={handleInputChange}
        placeholder="Please ipnut task"
      />
      <div className={styles.switch}>
        {editedTask.id === 0 ? (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={createClicked}
            color="primary"
          >
            Create
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={isDisabled}
            onClick={updateClicked}
            color="primary"
          >
            Update
          </Button>
        )}
      </div>
    </div>
  )
}

export default TaskInput
