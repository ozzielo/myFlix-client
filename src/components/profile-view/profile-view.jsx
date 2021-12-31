import React from 'react';
import axios from 'axios';
import { Button, Card, Col, Form, Row, Container } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
// import './user-view.scss';

export class UserView extends React.Component {
    constructor() {
        super();
        this.state = {
            // username: null,
            // password: null,
            // email: null,
            // birthday: null,

        };
    }

    componentDidMount() {
        this.props.getUser()
    }

    // getUser() {
    //     const user = localStorage.getItem("user");
    //     const token = localStorage.getItem("token");
    //     axios
    //         .get(`https://oscarsmyflixapp.herokuapp.com/users/${user}`, {
    //             headers: { Authorization: `Bearer ${token}` },
    //         })
    //         .then((response) => {
    //             const data = response.data;
    //             console.log(data)
    //             this.setState({
    //                 Username: response.data.Username,
    //                 Password: response.data.Password,
    //                 Email: response.data.Email,
    //                 Birthday: response.data.Birthday,
    //                 Favorites: response.data.FavoriteMovies
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // };

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
        const { username, email, birthday, favorites, movieData } = this.props
        console.log(movieData)
        console.log(this.props)
        let favoriteMovies = []

        movieData.forEach((movie) => {
            const movieID = movie._id
            favorites.forEach((favoriteMovieID) => {
                console.log(favoriteMovieID);

                if (movieID === favoriteMovieID) {
                    // if this is the case, then we have found a movie for target genre
                    favoriteMovies.push(movie)
                }
            })

        })
        console.log(favoriteMovies);



        return (
            <Container>
                <Card>
                    <h1>My Profile</h1>
                    <Card.Body>
                        <div>
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
                <div className="profileInformation">
                    <Form className="formDisplay" onSubmit={(e) => this.editUser(e)}>
                        <div>
                            <h3>EDIT PROFILE</h3>
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
                        <div className="marginSpacer">
                            <Button variant="success" type="submit" >Update</Button>
                        </div>
                    </Form>
                </div>
                <Row>
                    <Col className="acc-btns mt-1">
                        <Button size="md" variant="outline-danger" type="submit" ml="4" onClick={() => this.deleteUser()} >Delete Account</Button>
                    </Col>

                </Row>

                <h3 className="favorite-Movies-title">Favorite Movies</h3>
                <Row>

                    {favoriteMovies.map(m => (
                        <Col xs={6} md={4} lg={3} key={m._id}>
                            <br />
                            <br />

                            <MovieCard movieData={m} />
                            <Button bg="dark" variant="secondary" className="unfavorite-button" onClick={() => this.onRemoveFavorite(m)}>
                                Delete From Favorites
                </Button>
                        </Col>
                    ))}

                    {/* {favorites && favorites.map((movieData) => (
                        <Col xs={6} md={4} lg={3} key={movieData._id}>
                            <MovieCard movieData={movieData} />
                        </Col>
                    ))} */}

                    {/* {favorites && favorites.map((movieID) => {
                        console.log('m', movieID)
                        let favoriteMovies = []

                        movieData.forEach((element) => {
                            const movieKey = element._id
                            const

                        })

                        return <Col xs={6} md={4} lg={3} key={movieData._id}>
                            <MovieCard movieData={movieData} />
                        </Col>
                    })} */}
                </Row>


            </Container>
        )

    }

}