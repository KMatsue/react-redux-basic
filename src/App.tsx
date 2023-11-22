import { Counter } from "./features/counter/Counter"
import "./App.css"
import TaskList from "./features/task/TaskList"
import TaskInput from "./features/task/TaskInput"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Counter />
        <TaskInput />
        <TaskList />
      </header>
    </div>
  )
}

export default App
