import React from "react"
import styles from "./TaskDetails.module.css"
import { useAppSelector } from "../../app/hooks"
import { selectSelectedTask } from "./taskSlice"
const TaskDetails = () => {
  const selectedTask = useAppSelector(selectSelectedTask)
  return (
    <div className={styles.details}>
      {selectedTask && (
        <>
          <h2>{selectedTask.title}</h2>
          <p>Created at</p>
          <h2>{selectedTask.created_at}</h2>
          <p>Updated at</p>
          <h2>{selectedTask.updated_at}</h2>
        </>
      )}
    </div>
  )
}

export default TaskDetails
