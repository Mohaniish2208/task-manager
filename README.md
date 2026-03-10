# Task Manager

A simple task management app built with React, TypeScript, and Vite.

## Screenshots

-[Checkbox Clicked](src/Screenshots/Checkbox clicked.png)

## Overview

This project lets you create, manage, and track daily tasks in a clean card-based UI. Tasks are saved in browser `localStorage`, so your list stays available after refresh.

## Features

- Add a new task from the input field
- Press `Enter` to add a task
- Mark tasks complete with a checkbox
- Edit a task inline and press `Enter` or `Save` to update it
- Delete individual tasks
- Show progress with `completed / total` task count
- Clear all completed tasks
- Glow effect on the `Clear Completed` button when there is at least one completed task
- Persistent storage using `localStorage`

## Tech Stack

- React 19
- TypeScript
- Vite
- Plain CSS
- ESLint

## Project Structure

```text
task-manager/
  src/
    App.tsx                 # Main app logic and UI
    main.tsx                # React app entry point
    styles/App.css          # App styling
    images/                 # Background and button icons
    components/             # Present but currently empty
    types/task.ts           # Task type definition (currently unused by App.tsx)
  public/
  index.html
  package.json
  vite.config.ts
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

### 5. Lint the project

```bash
npm run lint
```

## Data Persistence

- Tasks are read from `localStorage` on initial load using the key `tasks`
- Any change to the task array is automatically written back to `localStorage`

## Notes

- The current task state in `App.tsx` uses `{ id: number; text: string; completed: boolean }`
- `src/types/task.ts` defines a different shape (`id: string`, `title: string`) and is not yet wired into `App.tsx`
