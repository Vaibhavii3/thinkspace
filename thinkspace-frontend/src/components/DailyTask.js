import React, { useState, useEffect} from "react";
import axios from 'axios';
import TaskForm from "./TaskForm";
import TaskList from "./TaskList"
import TaskHeatmap from "./TaskHeatmap";
import '../styles/DailyTask.css';



const DailyTask = () => {
    const [tasks, setTasks] = useState([]);
    const [taskData, setStreakData] = useState([]);

    // Fetch tasks from backend
    useEffect(() => {
        const fetchTasks = async () => {
            const { data } = await axios.get('/api/tasks');
            setTasks(data);
        };

        const fetchStreaks = async () => {
            const { data } = await axios.get('/api/streaks');
            setStreakData(data);
        };

        fetchTasks();
        fetchStreaks();
    }, []);

    const addTask = async (task) => {
        const { data } = await axios.post('/api/tasks', task);
        setTasks([...tasks, data]);
    };

    const toggleComplete = async (id) => {
        const { data } = await axios.patch(`/api/tasks/${id}`);
        setTasks(tasks.map(task => task._id === id ? data : task));
    };

    const deleteTask = async (id) => {
        await axios.delete(`/api/tasks/${id}`);
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div className="daily-task-container">
            <div className="daily-task-card">

            <h1 className="daily-task-title"> Daily Task Tracker</h1>

            <div className="section-divider"></div>

            <TaskForm addTask={addTask} />

            <h2 className="task-list-header">
                    Your Tasks
            </h2>

            <TaskList tasks={tasks} 
            toggleComplete={toggleComplete} 
            deleteTask={deleteTask} />

            <h2 className="task-list-header">Your Streaks</h2>

            <div className="heatmap-container">
                <TaskHeatmap taskData={taskData} />
            </div>
            </div>

        </div>
    );
};

export default DailyTask;