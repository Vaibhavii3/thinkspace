import React from 'react';
import '../styles/TaskList.css';

const TaskList = ({ tasks, toggleComplete, deleteTask }) => {
    return (
        <div className="task-list-container">
            <h2 className="text-xl font-bold mb-4">Your Tasks</h2>
            {tasks.length === 0 ? (
                <p className="no-tasks">No tasks available. Start adding tasks!</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li
                            key={task._id}
                            className="task-item"
                        >
                            <div>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => toggleComplete(task._id)}
                                    className="mr-2"
                                />
                                <span
                                    className={`task-name ${
                                        task.completed ? 'completed-task' : ''
                                    }`}
                                >
                                    {task.name}
                                </span>
                                {task.timer && (
                                    <span className="timer">
                                        (⏰ {task.timer})
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={() => deleteTask(task._id)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TaskList;
