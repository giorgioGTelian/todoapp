import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Task = ({ task, deleteTask, categoryId, toggleComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
      toggleComplete(categoryId, task.id, newTitle);
      setIsEditing(false);
  };

  return (
      <div className="task">
          <Form inline className='d-flex justify-content-center w-100'>
              <Row>
                <Col xs="auto">
                    {isEditing ? (
                        <Form.Control
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    ) : (
                        <span className={task.completed ? 'completed' : ''}>{task.title}</span>
                    )}
                </Col>
                <Col xs="auto">
                    <Button onClick={() => deleteTask(categoryId, task.id)}>Cancella Compito</Button>
                    <Button onClick={() => setIsEditing(!isEditing)}>Modifica Compito</Button>
                    <Button onClick={handleSave}>Salva</Button>
                    <Button onClick={toggleComplete}>Segna come completato</Button>
                </Col>
              </Row>
          </Form>
      </div>
  );
};

export default Task;
