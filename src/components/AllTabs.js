import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import Category from './Category';
import { useMediaQuery } from 'react-responsive';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Container from 'react-bootstrap/Container';


const AllTabs = ({ categories, addTask, deleteTask, deleteCategory, toggleComplete, editTask }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });
    const isDesktopOrLaptop = useMediaQuery({ query: '(min-width: 1224px)' });
    const [activeKey, setActiveKey] = useState(categories[0]?.id || '');
    const [showNavbar, setShowNavbar] = useState(false);
    const handleSelect = (selectedKey) => {
    setActiveKey(selectedKey);
    setShowNavbar(false);
    };
    return (
    <>
    {isTabletOrMobile && [false].map((expand) => (
         <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3 w-100" expanded={showNavbar}>
         <Container fluid className="w-100">
             <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} onClick={() => setShowNavbar(!showNavbar)} />
             <Navbar.Offcanvas
             id={`offcanvasNavbar-expand-${expand}`}
             aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
             placement="end"
             show={showNavbar}
             onHide={() => setShowNavbar(false)}
             >
             <Offcanvas.Header closeButton>
                   <Nav justify variant="pills" className="justify-content-end flex-grow-1 pe-3" activeKey={activeKey} style={{lineBreak:'anywhere'}}>
             {categories.map((category) => (
                 <Nav.Item key={category.id}>
                 <Nav.Link eventKey={category.id} onClick={() => handleSelect(category.id)}>{category.title}</Nav.Link>
                 </Nav.Item>
             ))}
         </Nav>
             </Offcanvas.Header>
             </Navbar.Offcanvas>
         </Container>
         </Navbar>
     ))
    }
   
    {isTabletOrMobile &&
      <Tab.Container justify activeKey={activeKey} onSelect={handleSelect}>
      <Row className="w-100 h-100">
          <Col sm={9}>
          <Tab.Content className="w-100 h-100">
          {categories.map((category) => (
              <Tab.Pane eventKey={category.id} key={category.id} >
              <Category category={category} tasks={category.tasks} addTask={addTask} deleteTask={deleteTask} deleteCategory={deleteCategory} toggleComplete={toggleComplete} editTask={editTask} />
              </Tab.Pane>
          ))}
          </Tab.Content>
          </Col>
      </Row>
      </Tab.Container>
      }
    {isDesktopOrLaptop &&<Tab.Container justify defaultActiveKey={categories[0]?.id || ''}>
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
 </Tab.Container>}
 </>
 );
};

export default AllTabs;

