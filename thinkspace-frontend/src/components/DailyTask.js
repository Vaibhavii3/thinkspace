import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../styles/DailyTask.css";
import axios from "axios";

function DailyTask() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
                setTasks(res.data || []);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async () => {
        if (newTask.trim()) {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, {
                    
                    description: newTask,
                    date: date.toISOString(),
                    completed: false,
                });
                setTasks([...tasks, res.data]);
                setNewTask("");
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };


    const handleTaskCompletion = async (taskId) => {
        try {
            // Update on server
            await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, { completed: true });
            setTasks(tasks.map((task) => 
                task._id === taskId 
                ? { ...task, completed: true }
                : task
            ));
        } catch (error) {
            console.error("Error marking task as completed:", error);
        }
    };
    

    const getTaskDataForHeatmap = () => {
        const streakData = {};
    
        // Aggregate completed tasks by date
        tasks.forEach((task) => {
            const taskDate = new Date(task.date).toISOString().split("T")[0];
            if (task.completed) {
                streakData[taskDate] = (streakData[taskDate] || 0) + 1;
            }
        });
    
        // Format data for heatmap
        return Object.keys(streakData).map((date) => ({
            date: new Date(date),
            count: streakData[date],
        }));
    };
    

    const handleEditTask = async (taskId, updatedDescription) => {
        try {
            // Update on server
            await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
                description: updatedDescription,
            });
    
            setTasks(tasks.map((task) =>
                task._id === taskId
                    ? { ...task, description: updatedDescription }
                    : task
            ));
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };
    
    const handleDeleteTask = async (taskId) => {
        try {
            // Delete from server
            await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
    
            setTasks(tasks.filter((task) => task._id !== taskId));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };
    


    return (
        <div className="dailytaskpage">
            <h1 className="head">Daily Task</h1>

            {/* Task Form */}
            <div className="task-form">
                <input
                    type="text"
                    placeholder="Add a new task"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                <button onClick={handleAddTask}>Add Task</button>
            </div>

            <div className="both-container">
                {/* Calendar */}
                <div className="calendar-container">
                    <Calendar 
                        onChange={setDate} 
                        value={date} 
                        className="custom-calendar" />
                </div>

            {/* Current Day Tasks */}
                <div className="current-day-tasks">
                    <h2>Tasks for {date.toDateString()}</h2>


                    {tasks
                        .filter((task) => new Date(task.date).toDateString() === date.toDateString())
                        .map((task) => (
                            <div key={task._id} className="task-item">

                                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    
                                    {task.description}

                                </span>

                                {!task.completed && (
                                <button onClick={() => handleTaskCompletion(task._id)}>Complete</button>
                                )}

                                <button onClick={() => {
                                    const updatedDescription = prompt("Edit Task Description:", task.description);
                                    if (updatedDescription) handleEditTask(task._id, updatedDescription);
                                }}>Edit</button>
                                <button onClick={() => handleDeleteTask(task._id)}>Delete</button>
                            </div>
                    ))}
                </div>
            </div>

            {/* Streak Progress */}
            <div className="streak-progress">
                <h2>Streak Progress</h2>

                <div className="heatmap">
                        
                    <Heatmap
                        startDate={new Date("2023-12-01")}
                        endDate={new Date()}
                        values={getTaskDataForHeatmap()}
                        classForValue={(value) => {
                            if (!value || value.count === undefined) {
                                return "color-scale-0"; // Default color for null/undefined count
                            }
                            return `color-scale-${Math.min(value.count, 6)}`; // Use count to determine the class
                        }}
                    
                        showWeekdayLabels={true}
                        showMonthLabels={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default DailyTask;