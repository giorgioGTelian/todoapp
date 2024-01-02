import React, { useState } from 'react';
import Task from './Task';
import Toast from 'react-bootstrap/Toast';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Trash } from 'react-bootstrap-icons';


const Category = ({ category, tasks, addTask, deleteTask, deleteCategory, toggleComplete, editTask }) => {
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
        <>
        <Card style={{ width: '100%' }}>
    <div className="category">
    <Card.Body>
    <Card.Title className="mb-2 d-flex justify-content-space-between align-items-center">Categoria Selezionata: {category.title}
    <Button onClick={() => deleteCategory(category.id)} variant="danger"><Trash /></Button>
    </Card.Title>
    <hr />
    <Card.Subtitle className="mb-1 text-muted">Compiti rimanenti: {tasks.filter((task) => !task.completed).length}</Card.Subtitle>
    <Card.Subtitle className="mb-1 text-muted">Compiti completati: {tasks.filter((task) => task.completed).length}</Card.Subtitle>
    <hr />
    <Card.Title>Compiti</Card.Title>
    <Card.Text>
    {tasks && tasks.length === 0 && <Badge bg="warning" text="dark">
        Non sono mai stati aggiunti compiti a questa categoria
    </Badge>}
    {/* if the all the task are completed add */}
    {tasks && tasks.length > 0 && tasks.every((task) => task.completed) && <Badge bg="success" text="dark">
        Tutti i compiti sono stati completati per questa categoria
    </Badge>}
    {/* if all the task are eliminated add */}
    {tasks && tasks.length > 0 && tasks.every((task) => task.deleted) && <Badge bg="danger" text="dark">
        Tutti i compiti sono stati eliminati per questa categoria
    </Badge>}
    
    {tasks && tasks.length > 0 && tasks?.filter(task => !task.completed).map((task) => (
    <Task key={task.id} task={task} deleteTask={deleteTask} categoryId={category.id} toggleComplete={toggleComplete} editTask={editTask}/>
))}

</Card.Text>
    <hr />
    <Card.Text>
    <Form inline className='mb-2 br-4 d-flex justify-content-center w-100 align-items-center'>
            <Row>
            <Col xs="auto">
                <Form.Control
                type="text" 
                placeholder="Aggiungi un compito..." 
                value={newTaskTitle} 
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="me-2"
                />
            </Col>
            <Col xs="auto">
            <Button onClick={handleAddTask}>Aggiungi Compito</Button>
            </Col>
            </Row>
        </Form>
    </Card.Text>
    </Card.Body>
    </div>
    </Card>
    
    {showToast && 
    <Toast
    position="center"
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
    </>
    );
};

export default Category;

