import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Heatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import "../styles/DailyTask.css";

function DailyTask() {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");
    const [date, setDate] = useState(new Date());
    const [notify, setNotify] = useState(false);

    // const [completedTasks, setCompletedTasks] = useState(0);
    // const [streak, setStreak] = useState(0);

    const handleAddTask = () => {
        if (newTask.trim()) {
            setTasks([...tasks, { id: tasks.length + 1, description: newTask, date, completed: false, notify }]);
            setNewTask("");
            setNotify(false);
        }
    };


    const handleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, completed: true } : task
        ));
    };

    const getTaskDataForHeatmap = () => {
        return tasks.map(task => ({
            date: task.date,
            count: task.completed ? 1 : 0, // 1 if task is completed, else 0
        }));
    };


    return (
        <div className="daily-task-page">
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

            {/* Calendar */}
            <Calendar onChange={setDate} value={date} />

            {/* Current Day Tasks */}
            <div className="current-day-tasks">
                <h2>Tasks for {date.toDateString()}</h2>
                {tasks
                    .filter((task) => task.date.toDateString() === date.toDateString())
                    .map((task, index) => (
                        <div key={index} className="task-item">
                            <span>{task.description}</span>
                            <button onClick={() => handleTaskCompletion(task.id)}>Complete</button>
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    ))}
            </div>

            {/* Streak Progress */}
            <div className="streak-progress">
                <h2>Streak Progress</h2>

                <Heatmap
                    startDate={new Date("2023-12-01")}
                    endDate={new Date()}
                    values={getTaskDataForHeatmap()}
                    classForValue={(value) => {
                        if (!value || value.count === undefined || value.count === null) {
                            return "color-scale-0"; // Default color for null/undefined count
                        }
                        return `color-scale-${value.count}`; // Use count to determine the class
                    }}
                
                    showWeekdayLabels={true}
                    showMonthLabels={true}
                />

            </div>
        </div>
    );
};

export default DailyTask;