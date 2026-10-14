# StudyFlow - Student Task Manager

A responsive React task manager built for the Batch 10, Module 25 assignment. Students can add, complete, filter, and delete tasks while viewing live progress statistics.

## Features

- Display task titles and status
- Add tasks with empty-input validation
- Mark tasks completed or pending
- Delete tasks through a confirmation dialog
- Empty-state messaging when no tasks match
- Total, completed, and remaining counts
- All, Pending, and Completed filters
- Reusable `Card` component using `children`
- Friendly error-boundary fallback UI
- Browser persistence with `localStorage`
- Responsive and keyboard-accessible interface

## Run locally

```bash
npm install
npm run dev
```

Open the local address shown in the terminal.

## Test and build

```bash
npm test
npm run build
```

## Project structure

```text
App.jsx
App.test.jsx
Card.jsx
DeleteDialog.jsx
ErrorBoundary.jsx
Stats.jsx
TaskForm.jsx
TaskItem.jsx
TaskList.jsx
main.jsx
setup.js
styles.css
```

## Submit on GitHub

1. Create a new GitHub repository named `student-task-manager`.
2. From this project folder, run:

```bash
git init
git add .
git commit -m "Complete student task manager assignment"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/student-task-manager.git
git push -u origin main
```

3. Submit the repository URL: `https://github.com/YOUR-USERNAME/student-task-manager`
