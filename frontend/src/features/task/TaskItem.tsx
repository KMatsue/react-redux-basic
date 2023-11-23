import styles from "./TaskItem.module.css"

import { BsTrash } from "react-icons/bs"
import { FaEdit } from "react-icons/fa"
import { useAppDispatch } from "../../app/hooks"

import { selectTask, editTask, Task, deleteAsyncTask } from "./taskSlice"

const TaskItem = ({ task }: { task: Task }) => {
  const dispatch = useAppDispatch()

  return (
    <li className={styles.listItem}>
      <span
        className={styles.cursor}
        onClick={() => dispatch(selectTask(task))}
      >
        {task.title}
      </span>
      <div>
        <button
          onClick={() => dispatch(deleteAsyncTask(task.id))}
          className={styles.taskIcon}
        >
          <BsTrash />
        </button>

        <button
          onClick={() => dispatch(editTask(task))}
          className={styles.taskIcon}
        >
          <FaEdit />
        </button>
      </div>
    </li>
  )
}

export default TaskItem
