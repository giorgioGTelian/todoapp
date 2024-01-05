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

import Toast from 'react-bootstrap/Toast';

/**
 * Represents the main component of the TODO app.
 * @returns {JSX.Element} The JSX element representing the App component.
 */
const App = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryTitle, setNewCategoryTitle] = useState('');
  const [showToast, setShowToast] = useState(false);

  /* storage */
  useEffect(() => {
  const categoriesFromStorage = localStorage.getItem('categories');
  if (categoriesFromStorage) {
  setCategories(JSON.parse(categoriesFromStorage));
  }
  }, []);

  useEffect(() => {
  localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  /* functions */
  const addCategory = () => {
    if (newCategoryTitle.trim() !== '') {
      setCategories([...categories, { id: Date.now(), title: newCategoryTitle, tasks: [] }]);
      setNewCategoryTitle('');
    } else {
      setShowToast(true);
    }
  };
 
  const hideToast = () => {
    setShowToast(false);
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

  return (
    <>
    <div className="main_content">
    
    
  <PageTitle>TODO List</PageTitle>
  <Navbar className="bg-body-tertiary justify-content-between navbar.header">
      <Form inline className='d-flex justify-content-center w-100'>
        <Row>
          <Col xs="auto" className='justify-content-center'>
            <Form.Control
              type="text" 
              placeholder="Aggiungi una categoria..." 
              value={newCategoryTitle} 
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              className="me-2"
            />
          </Col>
          <Col xs="auto" className='justify-content-center'>
          <Button variant="primary" onClick={addCategory}>
        Aggiungi Categoria
        </Button>
          </Col>
        </Row>
      </Form>
    </Navbar>  
    <div className="w-100 h-100">
    <AllTabs className="w-100 h-100" categories={categories} addTask={addTask} deleteTask={deleteTask} deleteCategory={deleteCategory} editTask={editTask} toggleComplete={toggleComplete} />
    {showToast && (
        <Toast onClose={hideToast} delay={3000} autohide position="middle-center">
          <Toast.Header>
            <strong className="me-auto">Attenzione</strong>
          </Toast.Header>
          <Toast.Body>Non è possibile inserire un campo vuoto!</Toast.Body>
        </Toast>
      )}
    </div>
  </div>
  </>
  );
};

export default App;

