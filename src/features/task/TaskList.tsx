import React from "react"

import { useAppSelector } from "../../app/hooks"
import { selectTasks } from "./taskSlice"
import TaskItem from "./TaskItem"
const TaskList: React.FC = () => {
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

export default TaskList
