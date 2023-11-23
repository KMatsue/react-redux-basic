import React from "react"

import { useAppSelector } from "../../../app/hooks"
import { selectTasks } from "./taskBasicSlice"
import TaskItem from "./TaskBasikItem"
const TaskBasicList: React.FC = () => {
  const tasks = useAppSelector(selectTasks)
  return (
    <>
      <div>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </>
  )
}

export default TaskBasicList
