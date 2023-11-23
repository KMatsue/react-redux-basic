import { Counter } from "./counter/Counter"
import "./Basic.css"
import TaskBasicList from "./task_basic/TaskBasicList"
import TaskBasicInput from "./task_basic/TaskBasicInput"
import FetchBasic from "./fetch_basic/FetchBasic"

const Basic = () => {
  return (
    <div className="basic">
      <Counter />
      <TaskBasicInput />
      <TaskBasicList />
      <FetchBasic />
    </div>
  )
}

export default Basic
