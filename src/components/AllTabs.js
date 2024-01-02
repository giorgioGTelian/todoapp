import React from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import Category from './Category';

/**
 * Renders a component that displays all tabs for different categories.
 *
 * @param {Object[]} categories - An array of category objects.
 * @param {Function} addTask - A function to add a new task.
 * @param {Function} deleteTask - A function to delete a task.
 * @param {Function} deleteCategory - A function to delete a category.
 * @param {Function} toggleComplete - A function to toggle the completion status of a task.
 * @param {Function} editTask - A function to edit a task.
 * @returns {JSX.Element} The rendered AllTabs component.
 */
const AllTabs = ({ categories, addTask, deleteTask, deleteCategory, toggleComplete, editTask }) => {
    return (
        <>
    <Tab.Container justify defaultActiveKey={categories[0]?.id || ''}>
        <Row>
        <Col sm={3}>
        <h5> Elenco delle Categorie </h5>
        <hr />
            <Nav justify variant="pills" className="flex-column" activeKey={categories[0]?.id} style={{lineBreak:'anywhere'}}>
            {categories.map((category) => (
                <Nav.Item key={category.id}>
                <Nav.Link eventKey={category.id}>{category.title}</Nav.Link>
                </Nav.Item>
            ))}
            </Nav>
        </Col>
        <Col sm={9}>
            <Tab.Content>
            {categories.map((category) => (
                <Tab.Pane eventKey={category.id} key={category.id}>
                <Category category={category} tasks={category.tasks} addTask={addTask} deleteTask={deleteTask} deleteCategory={deleteCategory} toggleComplete={toggleComplete} editTask={editTask} />
                </Tab.Pane>
            ))}
            </Tab.Content>
        </Col>
        </Row>
    </Tab.Container>
    </>
    );
};

export default AllTabs;
