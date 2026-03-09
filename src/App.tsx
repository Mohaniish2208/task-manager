import { useEffect, useState } from "react"
import penIcon from "./images/pen.png"
import deleteIcon from "./images/delete.png"
import "./styles/App.css"

function App() {
  const [task, setTask] = useState("")
  const [taskArr, setTaskArr] = useState<{ id: number; text: string; completed: boolean }[]>(() => {
    const saved = localStorage.getItem("tasks")
    return saved ? JSON.parse(saved) : []
  })

  const handleAddTask = () => {
    if (task.trim() === "") return
    setTaskArr((prev) => [...prev, { id: Date.now(), text: task.trim(), completed: false }]) // task.trim() resets the blank spaces
    setTask("")
  }

  const handleDeleteTask = (indexToDelete: number) => {
    setTaskArr((prev) => prev.filter((task) => task.id !== indexToDelete))
  }

  const handleToggleCompleted = (indexToToggle: number) => {
    setTaskArr((prev) =>
      prev.map((task) => (task.id === indexToToggle ? { ...task, completed: !task.completed } : task)),
    )
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(taskArr))
  }, [taskArr])

  const completedTasks = taskArr.filter((task) => task.completed).length
  const totalCount = taskArr.length

  const handleClearCompleted = () => {
    setTaskArr((prev) => prev.filter((task) => !task.completed))
  }

  const [editingId, setEditingId] = useState<number | null>(null) // task to be edited
  const [editingText, setEditingText] = useState("") // current input given

  const handleStartEdit = (task: { id: number; text: string }) => {
    setEditingId(task.id)
    setEditingText(task.text)
  }

  const handleSaveEdit = (id: number) => {
    setTaskArr((prev) => prev.map((task) => (task.id === id ? { ...task, text: editingText.trim() } : task)))

    setEditingId(null)
    setEditingText("")
  }

  return (
    <div className="app">
      <div className="task-manager">
        <h1 className="title">Task Manager</h1>

        <div className="counts-and-clear">
          <p className="total-counts">
            {completedTasks} of {totalCount} tasks completed.
          </p>

          <button
            className={`clear-button ${completedTasks > 0 ? "clear-button-glow" : ""}`}
            type="button"
            onClick={handleClearCompleted}
          >
            Clear Completed
          </button>
        </div>

        <div className="input-main-section">
          <div className="input-task-row">
            <input
              type="text"
              placeholder="Type here"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddTask()
              }}
              className="task-input"
            />
            <button type="button" className="add-button" onClick={handleAddTask}>
              + Add
            </button>
          </div>

          <ul className="task-list">
            {taskArr.map((t) => (
              <li className="task-item" key={t.id}>
                <input
                  className="checkbox-button"
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => handleToggleCompleted(t.id)}
                />

                {editingId === t.id ? (
                  <input
                    className="edit-input"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") return handleSaveEdit(t.id)
                    }}
                  />
                ) : (
                  <span className={t.completed ? "task-text completed" : "task-text"}>{t.text}</span>
                )}

                {editingId === t.id ? (
                  <button className="save-button" type="button" onClick={() => handleSaveEdit(t.id)}>
                    Save
                  </button>
                ) : (
                  <button className="edit-button" type="button" onClick={() => handleStartEdit(t)}>
                    <img className="pen-icon" src={penIcon} alt="Edit" />
                    Edit
                  </button>
                )}

                <button className="delete-button" type="button" onClick={() => handleDeleteTask(t.id)}>
                  <img className="delete-icon" src={deleteIcon} alt="Delete" />
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default App
