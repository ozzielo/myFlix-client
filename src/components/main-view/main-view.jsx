import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null
        };

    }

    getMovies(token) {
        axios.get('https://oscarsmyflixapp.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    // onRegistration(register) {
    //     this.setState({
    //         register,
    //     });
    // }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovie(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }
    render() {
        const { movies, user } = this.state;

        // if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);

        if (!user) return <Row>
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
        </Row>

        // if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view" />;
        return (
            <Router>

                <div className="main-view">
                    <Row className="main-view justify-content-md-center">

                        <Routes exact path="/"
                            render={() => {
                                return movies.map(m => (
                                    <Col md={3} key={m._id}>
                                        <MovieCard movie={m} />
                                    </Col>
                                ))
                            }}
                        />
                        <Routes>
                            <Route path="/movies/:movieId" render={({ match }) => {
                                return <Col md={8}>
                                    <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                                </Col>
                            }} />
                        </Routes>

                    </Row>
                </div>
            </Router>

            // <div className="main-view">
            //     <Navbar bg="navColor" variant="dark" expand="lg">
            //         <Container fluid>
            //             <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
            //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
            //             <Navbar.Collapse id="basic-navbar-nav">
            //                 <Nav className="me-auto">
            //                     <Nav.Link href="#home">Movies</Nav.Link>
            //                     <Nav.Link href="#user">Profile</Nav.Link>
            //                     <Nav.Link onClick={() => { this.onLoggedOut() }} href="#logout">Logout</Nav.Link>
            //                 </Nav>
            //             </Navbar.Collapse>
            //         </Container>
            //     </Navbar>
            //     <div>
            //         <Container>
            //             {selectedMovie
            //                 ? (
            //                     <Row className="justify-content-lg-center">
            //                         <Col lg={9} >
            //                             <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            //                         </Col>
            //                     </Row>
            //                 )
            //                 : (
            //                     <Row className="justify-content-lg-center">
            //                         { movies.map(movie => (
            //                             <Col xs={6} md={4} lg={3} >
            //                                 <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
            //                             </Col>
            //                         ))
            //                         }
            //                     </Row>
            //                 )
            //             }
            //         </Container>
            //     </div>
            // </div>
        );
    }
}

export default MainView;