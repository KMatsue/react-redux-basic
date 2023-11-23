import React from "react"
import { useAppDispatch } from "../../../app/hooks"
import { TaskBasic, completeTask, deleteTask } from "./taskBasicSlice"

const TaskBasicItem = ({ task }: { task: TaskBasic }) => {
  const dispatch = useAppDispatch()

  return (
    <div>
      <input
        type="checkbox"
        onClick={() => dispatch(completeTask(task))}
        defaultChecked={task.completed}
      />

      <span>{task.title}</span>
      <button onClick={() => dispatch(deleteTask(task))}>DELETE</button>
    </div>
  )
}

export default TaskBasicItem
