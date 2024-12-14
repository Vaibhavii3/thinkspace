import React, { useState } from 'react';
import '../styles/TaskForm.css';

const TaskForm = ({ addTask }) => {
    const [taskName, setTaskName] = useState('');
    const [timer, setTimer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (taskName.trim() === '') return;

        addTask({ name: taskName, timer });
        setTaskName('');
        setTimer('');
    };

    return (
        <div className='task-form-container'>

        <form onSubmit={handleSubmit}>
            <div className="flex-container">
                <input
                    type="text"
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    className="border p-2 w-full md:w-2/3 rounded"
                />
                <input
                    type="time"
                    value={timer}
                    onChange={(e) => setTimer(e.target.value)}
                    className="border p-2 w-full md:w-1/3 rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                    Add Task
                </button>
            </div>
        </form>
        </div>
    );
};

export default TaskForm;
