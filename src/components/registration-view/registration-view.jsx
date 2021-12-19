import React, { useState } from 'react';
import PropTypes from "prop-types";
import './registration-view.scss';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email, birthday);

        props.onRegistration(username);
    };

    return (
        <div>
            <Navbar bg="navColor" variant="dark" expand="lg">
                <Container fluid>
                    <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="#login">Login</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid className="registerContainer">
                <Card className="loginCard" style={{ width: '28rem' }}>
                    <Card.Body>
                        <Card.Title className="text-center">Welcome to MyFlix.</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted text-center">Please Register</Card.Subtitle>

                        <Form >
                            <Form.Group controlId="formUsername">
                                <Form.Label>Username:</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Username"
                                    onChange={e => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="email"
                                    placeholder="Enter Email" onChange={e => setEmail(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="date" onChange={e => setBirthday(e.target.value)} />
                            </Form.Group>

                            <Button className="loginButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>
                                Register
                        </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
        // <form>
        //     <label>
        //         Username:
        //         <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
        //     </label>
        //     <label>
        //         Password:
        //         <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        //     </label>
        //     <label>
        //         Email:
        //         <input type="email" value={email} onchange={e => setEmail(e.target.value)} />
        //     </label>
        //     <label>
        //         Birthday:
        //         <input type="date" value={birthday} onchange={e => setBirthday(e.target.value)} />
        //     </label>
        //     <button type="submit" onClick={handleSubmit}>Register</button>
        // </form>

    );
}
RegistrationView.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};