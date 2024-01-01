import React from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import Category from './Category';

const AllTabs = ({ categories, addTask, deleteTask, deleteCategory, toggleComplete, editTask }) => {
    return (
    <Tab.Container defaultActiveKey={categories[0]?.id || ''}>
        <Row>
        <Col sm={3}>
            <Nav variant="underline" className="flex-column">
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
    );
};

export default AllTabs;
