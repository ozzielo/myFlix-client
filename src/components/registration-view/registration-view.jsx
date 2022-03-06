import React, { useState } from 'react';
import PropTypes from "prop-types";
import './registration-view.scss';
import { Navbar, Nav, Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be atleast 2 characters');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPasswordErr('Password must be atleast 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr('Email Required');
            isReq = false;
        }

        if (!birthday) {
            setBirthdayErr('Birthday Required');
            isReq = false;
        }

        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            axios.post('https://oscarsmyflixapp.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birthday: birthday
            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self');
                })
                .catch(e => {
                    console.log('error registering the user')
                });
            console.log(username, password, email, birthday);

        }



    };

    return (

        <div className="registration-view-div">
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
                                {usernameErr && <p>{usernameErr}</p>}
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={e => setPassword(e.target.value)}
                                />
                                {passwordErr && <p>{passwordErr}</p>}
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="email"
                                    placeholder="Enter Email"
                                    onChange={e => setEmail(e.target.value)}
                                />
                                {emailErr && <p>{emailErr}</p>}
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Birthday:</Form.Label>
                                <Form.Control
                                    className="mb-3"
                                    type="date"
                                    onChange={e => setBirthday(e.target.value)}
                                />
                                {birthdayErr && <p>{birthdayErr}</p>}
                            </Form.Group>

                            <Button className="loginButton" variant="secondary" size="lg" type="submit" onClick={handleSubmit}>
                                Register
                        </Button>
                            <Link to={`/`}>
                                <a href="/">Already a member?</a>
                            </Link>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>


    );
}
RegistrationView.propTypes = {

};