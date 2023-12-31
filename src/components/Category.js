import React, { useState } from 'react';
import Task from './Task';
import Toast from 'react-bootstrap/Toast';

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
    <button onClick={() => deleteCategory(category.id)}>Elimina Categoria</button>
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
    
    
    {tasks && tasks.length === 0 && <p>Non ci sono compiti</p>}
    {showToast && 
    <Toast
    position="bottom-right"
        toastOptions={{
            style: {
            fontSize: '1.4rem',
            },
        }}
    onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
        <Toast.Header>
        <strong className="me-auto">Errore</strong>
        </Toast.Header>
        <Toast.Body>Campi nulli non accetti</Toast.Body>
    </Toast>
    }
    </div>
    );
};

export default Category;

