import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import './profile-view.scss';
import { setUser, updateUser } from "../../actions/actions";
import { connect } from "react-redux";

class UserView extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    componentDidMount() {
        this.props.getUser()
    }


    onRemoveFavorite = (m) => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        axios.delete(`https://oscarsmyflixapp.herokuapp.com/users/${user}/Favorites/${m._id}`,
            { headers: { Authorization: `Bearer ${token}` } }


        )
            .then((response) => {
                console.log(response);
                alert("Removed from Favorites")
                this.componentDidMount();
                window.location.reload();
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
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            { headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => {
                this.setState({
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
        const { movies, user } = this.props

        console.log(".", user)
        let favoriteMovies = []

        if (user.favorites) {
            movies.forEach((movie) => {
                const movieID = movie._id
                user.favorites.forEach((favoriteMovieID) => {
                    console.log(favoriteMovieID);

                    if (movieID === favoriteMovieID) {
                        favoriteMovies.push(movie)
                    }
                })

            })
        }

        console.log(favoriteMovies);



        return (
            <Container fluid>
                <Card>

                    <Card.Body>
                        <Card.Title>MY PROFILE</Card.Title>
                        <div>
                            <h4>Username: {user.username}</h4>
                            <h4>Email: {user.email}</h4>
                            <h4>Birthday: {user.birthday}</h4>
                        </div>
                    </Card.Body>
                </Card>
                <div className="profileInformation">
                    <br />
                    <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
                        <div>
                            <h6>EDIT PROFILE</h6>
                        </div>
                        <Form.Group>
                            Username
              <Form.Control type='text' name="Username" placeholder="New Username" onChange={(e) => this.setUsername(e.target.value)} required />
                        </Form.Group>

                        <Form.Group>
                            Password
              <Form.Control type='password' name="Password" placeholder="New Password" onChange={(e) => this.setPassword(e.target.value)} required />

                        </Form.Group>
                        <Form.Group>
                            Email Address
              <Form.Control type='email' name="Email" placeholder="New Email" onChange={(e) => this.setEmail(e.target.value)} required />

                        </Form.Group>
                        <Form.Group>
                            Birthday
              <Form.Control type='date' name="Birthday" onChange={(e) => this.setBirthday(e.target.value)} />

                        </Form.Group>
                        <div className="profile-update-div">
                            <br />
                            <Button className="update-button" variant="success" type="submit" >Update</Button>
                        </div>
                    </Form>
                </div>
                <Row>
                    <Col className="account-button">
                        <br />
                        <Button size="md" variant="outline-danger" type="submit" onClick={() => this.deleteUser()} >Delete Account</Button>
                    </Col>

                </Row>
                <br />

                <h2 className="favorite-movies-title " >Favorite Movies:</h2>
                <Row className="fav-row ">


                    {favoriteMovies.map(m => (

                        <Col sm={6} md={4} key={m._id} className="justify-content-center">
                            < br />
                            <br />

                            <MovieCard movieData={m} />
                            <div classname="unfavorite-button-div" style={{ display: "flex", justifyContent: "center" }}>
                                <Button bg="dark" variant="secondary" size="sm" className="unfavorite-button" onClick={() => this.onRemoveFavorite(m)}>
                                    Delete From Favorites
                </Button>

                            </div>

                        </Col>



                    ))}


                </Row>


            </Container >
        )

    }

}

let mapStateToProps = (state) => {
    console.log(">>>>>>", state);
    return {
        user: state.user,
        movies: state.movies
    };
};

export default connect(mapStateToProps, { setUser, updateUser })(UserView);