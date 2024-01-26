import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    useEffect(() => { 
        axios.get('http://localhost:5000/api/tasks').then((response) => {
            setTasks(response.data);
            });
    }, []);

    const addTask = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/tasks', {
                title: newTask,
            });

            setTasks((prevTasks) => [...prevTasks, response.data]);
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error.message);
        }
    };

    return (
        <div>
            <h1>Task List</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>{task.title}</li>
                ))}
            </ul>
            <input
                type="text"
                placeholder="New Task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default Home;
