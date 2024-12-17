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
    const [notify, setNotify] = useState(false);

    // const [completedTasks, setCompletedTasks] = useState(0);
    // const [streak, setStreak] = useState(0);

    // const handleAddTask = () => {
    //     if (newTask.trim()) {
    //         setTasks([...tasks, { id: tasks.length + 1, description: newTask, date, completed: false, notify }]);
    //         setNewTask("");
    //         setNotify(false);
    //     }
    // };



    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/tasks`);
                setTasks(res.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);



    const handleAddTask = async () => {
        if (newTask.trim()) {
            const taskData = {
                description: newTask,
                date: date.toISOString(),
                notify: notify,
            };
    
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, taskData);
                console.log("Added Task:", res.data);
                // setTasks([...tasks, res.data]);
                setTasks([...tasks, { ...res.data, id: res.data._id }]);
                setNewTask("");
                setNotify(false);
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };


    const handleTaskCompletion = async (taskId) => {
        try {
            // Update on server
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
                completed: true,
            });

            // Find the task and mark it as completed
            // const updatedTasks = tasks.map((task) => {
            //     if (task.id === taskId) {
            //         return { ...task, completed: true };
            //     }
            //     return task;
            // });

            const updatedTasks = tasks.map((task) =>
                task.id === taskId || task._id === taskId ? res.data : task
            );    
        
            // Update local state
            setTasks(updatedTasks);
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
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`, {
                description: updatedDescription,
            });
    
            // Update local state
            const updatedTasks = tasks.map((task) =>
                task.id === taskId ? { ...task, description: updatedDescription } : task
            );
    
            setTasks(updatedTasks);
        } catch (error) {
            console.error("Error editing task:", error);
        }
    };
    
    const handleDeleteTask = async (taskId) => {
        try {
            // Delete from server
            await axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${taskId}`);
    
            // Update local state
            const updatedTasks = tasks.filter((task) => task.id !== taskId && task._id !== taskId);
            setTasks(updatedTasks);
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

                <div className="form-controls">
                    <label>
                        Notify:
                        <input
                            type="checkbox"
                            checked={notify}
                            onChange={() => setNotify(!notify)}
                        />
                    </label>

                    <button onClick={handleAddTask}>Add Task</button>
                </div>
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
                        .map((task, index) => (
                            <div key={task.id || index} className="task-item">

                                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                                    
                                    {task.description}

                                </span>

                                {!task.completed && (
                                <button onClick={() => handleTaskCompletion(task.id || task._id)}>Complete</button>
                                )}

                                <button onClick={() => {
                                    const updatedDescription = prompt("Edit Task Description:", task.description);
                                    if (updatedDescription) handleEditTask(task.id || task._id, updatedDescription);
                                }}>Edit</button>
                                <button onClick={() => handleDeleteTask(task.id || task._id)}>Delete</button>
                            </div>
                    ))}


                    {/* {tasks
                        .filter((task) => {
                            const taskDate = new Date(task.date);
                            return taskDate.toDateString() === date.toDateString();
                        })                
                        .map((task, index) => (
                            <div key={index} className="task-item">
                                <span>{task.description}</span>

                                <button onClick={() => handleTaskCompletion(task.id)}>Complete</button>

                                <button onClick={() => {
                                    const updatedDescription = prompt("Edit Task Description:", task.description);
                                    if (updatedDescription) handleEditTask(task.id, updatedDescription);
                                    }}>Edit
                                </button>

                                <button onClick={() => handleDeleteTask(task.id)}>Delete</button>

                            </div>
                        ))} */}

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