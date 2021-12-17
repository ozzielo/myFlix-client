import React, { useState } from 'react';
import PropTypes from "prop-types";
import './login-view.scss';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios.post('https://oscarsmyflixapp.herokuapp.com/login', {
            Username: username,
            Password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no su ch user')
            });

        // const handleSubmit = (e) => {
        //     e.preventDefault();
        //     axios.post('https://oscarsmyflixapp.herokuapp.com/login', {
        //         Username: username,
        //         Password: password
        //     })
        //         .then(response => {
        //             const data = response.data;
        //             props.onLoggedIn(data);
        //         })
        //         .catch(e => {
        //             console.log('User Not Found')
        //         });



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
            <Container fluid className="loginContainer">
                <Card className="loginCard" style={{ width: '28rem' }}>
                    <Card.Body>
                        <Card.Title className="text-center">Welcome to MyFlix.</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted text-center">Please Login</Card.Subtitle>

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

                            <Button className="loginButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>
                                Login
                            </Button>
                            <a href="url">Not a member?</a>
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
        //     <button type="submit" onClick={handleSubmit}>Submit</button>
        //     <a href="url">Not a member?</a>
        // </form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired
};