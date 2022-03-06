import React from 'react';
import { Navbar, Nav, Container, Row, Col, NavDropdown } from 'react-bootstrap';
import './navbar.scss';

export function NavBarView() {
    const user = localStorage.getItem("user");


    onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self");
    };

    return (
        <div className="navbar-div">
            <Navbar bg="navColor" variant="dark" expand="lg" fixed="top">
                <Container fluid>
                    <Navbar.Brand href="/">MyFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Movies</Nav.Link>
        //                  <Nav.Link href={`/users/${user}`}>Profile: {user}</Nav.Link>
        //                  <Nav.Link onClick={() => { this.onLoggedOut() }} href="#logout">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
