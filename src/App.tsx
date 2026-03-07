import { useEffect, useState } from "react"

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
    <div style={{ border: "4px solid brown", borderRadius: 10, padding: 10 }}>
      <h1 className="title" style={{ fontFamily: "sans-serif" }}>
        Task Manager
      </h1>

      <p style={{ fontFamily: "sans-serif" }}>
        {completedTasks} of {totalCount} tasks completed.
      </p>

      <button type="button" onClick={handleClearCompleted}>
        Clear completed
      </button>

      <div className="input-task-row" style={{ display: "flex", gap: 5 }}>
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
        <button type="button" className="addBtn" onClick={handleAddTask} style={{ padding: "2px 5px" }}>
          Add
        </button>
      </div>

      <ul>
        {taskArr.map((t) => (
          <li key={t.id}>
            <input type="checkbox" checked={t.completed} onChange={() => handleToggleCompleted(t.id)} />

            {editingId === t.id ? (
              <input value={editingText} onChange={(e) => setEditingText(e.target.value)} />
            ) : (
              <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>{t.text}</span>
            )}

            {editingId === t.id ? (
              <button type="button" onClick={() => handleSaveEdit(t.id)}>
                Save
              </button>
            ) : (
              <button type="button" onClick={() => handleStartEdit(t)}>
                Edit
              </button>
            )}

            <button type="button" onClick={() => handleDeleteTask(t.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
