import React from 'react';
import Heatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css'; 
import '../styles/TaskHeatmap.css';


// const TaskHeatmap = ({ taskData = []}) => {
const TaskHeatmap = () => {

    const taskData = [
        { date: '2024-12-01', completedTasks: 1 },
        { date: '2024-12-02', completedTasks: 3 },
        { date: '2024-12-03', completedTasks: 2 },
        { date: '2024-12-05', completedTasks: 4 },
        { date: '2024-12-07', completedTasks: 1 },
        { date: '2024-11-07', completedTasks: 5 },
    ];

    const values = taskData.map(task => ({
        date: task.date, // Format: 'YYYY-MM-DD'
        count: task.completedTasks, // Number of tasks completed
    }));

    return (
        <div className='task-heatmap-container'>
            {/* <h2>Task Heatmap</h2> */}
            <Heatmap
                startDate={new Date(new Date().setFullYear(new Date().getFullYear() - 1))} // One year back
                endDate={new Date()} // Today
                values={values}
                classForValue={value => {
                    if (!value) {
                        return 'color-empty'; // Empty days
                    }
                    // Assign classes based on task completion count
                    return `color-scale-${Math.min(value.count, 4)}`;
                }}
                showWeekdayLabels
            />
        </div>
    );
};

export default TaskHeatmap;
