import "./App.css";
import Navbar from "./components/navbar";
import Dashboard from "./components/dashboard";
import Tasks from "./components/task";
import TaskDetails from "./components/taskdetails";
import Login from "./components/login";
import Register from "./components/register";

import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5001/api/tasks")
            .then((response) => response.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => {
                console.log("Error fetching tasks:", error);
            });
    }, []);

    return (
        <div>
            <Routes>
                {/* Login page opens first */}
                <Route path="/" element={<Navigate to="/login" />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={
                        <>
                            <Navbar />
                            <Dashboard
                                tasks={tasks}
                                setTasks={setTasks}
                            />
                        </>
                    }
                />

                <Route
                    path="/tasks"
                    element={
                        <>
                            <Navbar />
                            <Tasks tasks={tasks} />
                        </>
                    }
                />

                <Route
                    path="/tasks/:id"
                    element={
                        <>
                            <Navbar />
                            <TaskDetails tasks={tasks} />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;