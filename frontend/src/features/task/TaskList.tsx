import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import TaskItem from "./TaskItem"
import { fetchAsyncProf } from "../login/loginSlice"
import { selectTasks, fetchAsyncTask } from "./taskSlice"
import styles from "./TaskList.module.css"

const TaskList = () => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector(selectTasks)

  useEffect(() => {
    const fetchTaskProf = async () => {
      await dispatch(fetchAsyncTask())
      await dispatch(fetchAsyncProf())
    }
    fetchTaskProf()
  }, [dispatch])

  return (
    <div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
    </div>
  )
}

export default TaskList
