import React, { useState } from 'react';
import Task from './Task';


const Category = ({ category, tasks, addTask, deleteTask, deleteCategory }) => {
 const [newTaskTitle, setNewTaskTitle] = useState('');

 const handleAddTask = () => {
 addTask(category.id, newTaskTitle);
 setNewTaskTitle('');
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
   {tasks && tasks.length > 0 && <button onClick={() => deleteCategory(category.id)}>Cancella Categoria</button>}
 </div>
 );
};

export default Category;
