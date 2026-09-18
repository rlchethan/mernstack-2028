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
                {/* Open login page first */}
                <Route
                    path="/"
                    element={<Navigate to="/login" />}
                />

                {/* Login page */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Register page */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Dashboard page */}
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

                {/* Tasks page */}
                <Route
                    path="/tasks"
                    element={
                        <>
                            <Navbar />

                            <Tasks
                                tasks={tasks}
                            />
                        </>
                    }
                />

                {/* Task details page */}
                <Route
                    path="/tasks/:id"
                    element={
                        <>
                            <Navbar />

                            <TaskDetails
                                tasks={tasks}
                            />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;