import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import './App.css';

const App = () => {
 const [categories, setCategories] = useState([]);
 const [newCategoryTitle, setNewCategoryTitle] = useState('');

 useEffect(() => {
 const categoriesFromStorage = localStorage.getItem('categories');
 if (categoriesFromStorage) {
   setCategories(JSON.parse(categoriesFromStorage));
 }
 }, []);

 useEffect(() => {
 localStorage.setItem('categories', JSON.stringify(categories));
 }, [categories]);

 const addCategory = () => {
 setCategories([...categories, { id: Date.now(), title: newCategoryTitle, tasks: [] }]);
 setNewCategoryTitle('');
 };

 const addTask = (categoryId, taskTitle) => {
 setCategories(
   categories.map((category) => {
     if (category.id === categoryId) {
       return { ...category, tasks: [...category.tasks, { id: Date.now(), title: taskTitle, completed: false }] };
     } else {
       return category;
     }
   })
 );
 };

 return (
 <div className="app">
   {categories.map((category) => (
     <Category key={category.id} category={category} addTask={addTask} />
   ))}
   <input 
     type="text" 
     placeholder="Aggiungi una categoria..." 
     value={newCategoryTitle} 
     onChange={(e) => setNewCategoryTitle(e.target.value)}
   />
   <button onClick={addCategory}>Aggiungi Categoria</button>
 </div>
 );
};

export default App;
