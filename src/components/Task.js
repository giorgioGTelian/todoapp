import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { Trash } from 'react-bootstrap-icons';
import { Check2 } from 'react-bootstrap-icons';
import { PencilSquare } from "react-bootstrap-icons";
import '../Style/modules/task.module.css';
import '../Style/modules/task.module.css';

/**
 * Represents a task component.
 * @param {Object} props - The props for the Task component.
 * @param {Object} props.task - The task object.
 * @param {Function} props.deleteTask - The function to delete a task.
 * @param {string} props.categoryId - The category ID.
 * @param {Function} props.toggleComplete - The function to toggle task completion.
 * @param {Function} props.editTask - The function to edit a task.
 * @returns {JSX.Element} The Task component.
 */
const Task = ({ task, deleteTask, categoryId, toggleComplete, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

const handleSave = () => {
  if (!task.completed) {
    editTask(categoryId, task.id, newTitle);
    setIsEditing(false);
  }
};

return (
    <div className="mb-2 br-4 d-flex justify-content-space-between align-items-center" style={{ justifyContent: 'space-between!important' }}>
        <Form inline className='g-1 justify-content-flex-start'>
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
            </Row>
        </Form>
        <Row className='justify-content-center g-1'>
        <ButtonGroup className="mb-2">
                <Button onClick={() => toggleComplete(categoryId, task.id)} variant="success"><Check2 /></Button>
                <Button onClick={() => setIsEditing(!isEditing)}variant="secondary"><PencilSquare /></Button>
                {isEditing && <Button onClick={handleSave}>Salva</Button>}
                <Button onClick={() => deleteTask(categoryId, task.id)} variant="danger"><Trash /></Button>    
              </ButtonGroup>
        </Row>
    </div>
  );
};

export default Task;
