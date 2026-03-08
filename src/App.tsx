import { useEffect, useState } from "react"
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

  const [editingId, seteditingId] = useState<number | null>(null) // task to be edited
  const [editingText, setEditingText] = useState("") // current input given

  const handleStartEdit = (task: { id: number; text: string }) => {
    seteditingId(task.id)
    setEditingText(task.text)
  }

  const handleSaveEdit = (id: number) => {
    setTaskArr((prev) => prev.map((task) => (task.id === id ? { ...task, text: editingText.trim() } : task)))

    seteditingId(null)
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

          <button className="clear-button" type="button" onClick={handleClearCompleted}>
            Clear completed
          </button>
        </div>

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
            style={{ padding: 2 }}
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
                <input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
              ) : (
                <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>{t.text}</span>
              )}

              {editingId === t.id ? (
                <button className="save-button" type="button" onClick={() => handleSaveEdit(t.id)}>
                  Save
                </button>
              ) : (
                <button className="edit-button" type="button" onClick={() => handleStartEdit(t)}>
                  Edit
                </button>
              )}

              <button className="delete-button" type="button" onClick={() => handleDeleteTask(t.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
