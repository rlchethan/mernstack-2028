import "./App.css";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import Tasks from "./components/Tasks";
import TaskDetails from "./components/TaskDetails";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks")
      .then((response) => response.json())
      .then((data) => setTasks(data))
      .catch(() => {
        setTasks([
          {
            id: 1,
            title: "Learn React",
            description: "Understanding Components",
            status: "Completed",
          },
          {
            id: 2,
            title: "Learn JavaScript",
            description: "Understanding Variables, Functions",
            status: "Pending",
          },
          {
            id: 3,
            title: "Learn MongoDB",
            description: "Understanding Databases",
            status: "Pending",
          },
        ]);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard tasks={tasks} setTasks={setTasks} />} />
        <Route path="/tasks" element={<Tasks tasks={tasks} />} />
        <Route path="/tasks/:id" element={<TaskDetails tasks={tasks} />} />
      </Routes>
    </div>
  );
}

export default App;