import React, { useState } from 'react';
import Task from './Task';

const Category = ({ category, tasks, addTask }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const handleAddTask = () => {
    addTask(category.id, newTaskTitle);
    setNewTaskTitle('');
    };

    return (
    <div className="category">
        <h2>{category.title}</h2>
        {tasks?.map((task) => (
        <Task key={task.id} task={task} />
        ))}
        <input 
        type="text" 
        placeholder="Aggiungi un compito..." 
        value={newTaskTitle} 
        onChange={(e) => setNewTaskTitle(e.target.value)}
        />
        <button onClick={handleAddTask}>Aggiungi Compito</button>
    </div>
    );
};

export default Category;
