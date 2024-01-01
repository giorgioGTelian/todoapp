import React, { useState, useEffect } from 'react';
import PageTitle from './components/PageTitle';
import AllTabs from './components/AllTabs';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

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
  const editTask = (categoryId, taskId, newTitle) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) =>
              task.id === taskId ? { ...task, title: newTitle } : task
            ),
          };
        } else {
          return category;
        }
      })
    );
   };
  
   const toggleComplete = (categoryId, taskId) => {
    setCategories(
      categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            tasks: category.tasks.map((task) =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          };
        } else {
          return category;
        }
      })
    );
   };
  
 /* TODO REFRACTOR CODE */
  return (
    <>
    <div className="main_content">
  <PageTitle>TODO List</PageTitle>
  <Navbar className="bg-body-tertiary justify-content-between navbar.header">
      <Form inline className='d-flex justify-content-center w-100'>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text" 
              placeholder="Aggiungi una categoria..." 
              value={newCategoryTitle} 
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              className="me-2"
            />
          </Col>
          <Col xs="auto">
          <Button variant="primary" onClick={addCategory}>
        Aggiungi Categoria
        </Button>
          </Col>
        </Row>
      </Form>
    </Navbar>  
    <AllTabs categories={categories} addTask={addTask} deleteTask={deleteTask} deleteCategory={deleteCategory} editTask={editTask} toggleComplete={toggleComplete} />
  </div>
  </>
  );
};

export default App;

