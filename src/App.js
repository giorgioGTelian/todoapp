import React, { useState, useEffect } from 'react';
import Category from './components/Category';
import PageTitle from './components/PageTitle';
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
  if (newCategoryTitle !== '') {
  setCategories([...categories, { id: Date.now(), title: newCategoryTitle, tasks: [] }]);
  setNewCategoryTitle('');
  }
  };

  const deleteCategory = (categoryId) => {
  setCategories(categories.filter((category) => category.id !== categoryId));
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

  const deleteTask = (categoryId, taskId) => {
  setCategories(
  categories.map((category) => {
    if (category.id === categoryId) {
      return { ...category, tasks: category.tasks.filter((task) => task.id !== taskId) };
    } else {
      return category;
    }
  })
  );
  };

  return (
    <>
  <PageTitle>TODO List</PageTitle>
  <div className="main_content">
  {categories.map((category) => (
    <Category key={category.id} category={category} tasks={category.tasks} addTask={addTask} deleteTask={deleteTask} deleteCategory={deleteCategory} />
  ))}
  <input 
    type="text" 
    placeholder="Aggiungi una categoria..." 
    value={newCategoryTitle} 
    onChange={(e) => setNewCategoryTitle(e.target.value)}
  />
  <button onClick={addCategory}>Aggiungi Categoria</button>
  </div>
  </>
  );
};

export default App;

