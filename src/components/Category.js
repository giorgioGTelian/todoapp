import React, { useState } from 'react';
import Task from './Task';
import { Toast, Button } from 'react-bootstrap';

const Category = ({ category, tasks, addTask, deleteTask, deleteCategory }) => {
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [showToast, setShowToast] = useState(false);

    const handleAddTask = () => {
    if (newTaskTitle === '') {
    setShowToast(true);
    } else {
    addTask(category.id, newTaskTitle);
    setNewTaskTitle('');
    }
    };

    return (
    <div className="category">
    <h2>{category.title}</h2>
    {tasks && tasks.length > 0 && tasks.map((task) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} categoryId={category.id} />
    ))}
    <input 
        type="text" 
        placeholder="Aggiungi un compito..." 
        value={newTaskTitle} 
        onChange={(e) => setNewTaskTitle(e.target.value)}
    />
    <button onClick={handleAddTask}>Aggiungi Compito</button>
    {showToast && 
    <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
        <strong className="me-auto">Errore</strong>
        </Toast.Header>
        <Toast.Body>Campi nulli non accetti</Toast.Body>
    </Toast>
    }
    {tasks && tasks.length > 0 && <button onClick={() => deleteCategory(category.id)}>Cancella Categoria</button>}
    </div>
    );
};

export default Category;

