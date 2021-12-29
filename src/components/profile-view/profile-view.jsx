import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
// import './user-view.scss';

export class UserView extends React.Component {
    constructor() {
        super();
        this.state = {
            username: null,
            password: null,
            email: null,
            birthday: null,
            favorites: [],
        };
    }

    componentDidMount() {
        this.props.getUser()
    }

    onRemoveFavorite = (e, movie) => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://oscarsmyflixapp.herokuapp.com/users/${user}/Favorites/${this.props.movie._id}`,
            { headers: { Authorization: `Bearer ${token}` } }


        )
            .then((response) => {
                console.log(response);
                alert("Removed from Favorites")
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    deleteUser() {
        const confirmed = window.confirm("Are you sure you want to delete your account?");
        if (confirmed) {
            const user = localStorage.getItem('user');
            const token = localStorage.getItem('token');
            axios.delete(`https://oscarsmyflixapp.herokuapp.com/users/${user}`,
                { headers: { Authorization: `Bearer ${token}` } }
            )
                .then(() => {
                    alert(user + "has been deleted");
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    window.location.pathname = "/";
                })
                .catch(function (error) {
                    console.log(error);
                })
        };
    }

    editUser(e) {
        e.preventDefault();
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.put(`https://oscarsmyflixapp.herokuapp.com/users/${user}`,
            {
                Name: this.state.Name,
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                this.setState({
                    Name: response.data.Name,
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday
                });
                localStorage.setItem('user', response.data.Username);
                const data = response.data;
                console.log(data);
                console.log(this.state.Username);
                alert('Profile updated');
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    setName(value) {
        this.state.Name = value;
    }

    setUsername(value) {
        this.state.Username = value;
    }

    setPassword(value) {
        this.state.Password = value;
    }

    setEmail(value) {
        this.state.Email = value;
    }

    setBirthday(value) {
        this.state.Birthday = value;
    }

    render() {
        const { name, username, email, birthday, favorites } = this.props
        console.log(this.props)

        return (
            <Container>
                <Card>
                    <h1>My Profile</h1>
                    <Card.Body>
                        <div>
                            <h4>Name: {name}</h4>
                            <h4>Username: {username}</h4>
                            <h4>Email: {email}</h4>
                            <h4>Birthday: {birthday}</h4>
                        </div>
                        {/* <div>
                            <span className="label">Description: </span>
                            <span className="value">{genre.Description}</span>
                        </div>
                        <div className="genre-button-div">
                            <Button className="genre-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
                        </div> */}
                    </Card.Body>
                </Card>


            </Container>
        )

    }

}