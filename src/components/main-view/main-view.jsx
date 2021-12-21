import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { Route, Routes } from "react-router-dom";


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
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setSelectedMovie(movie) {
        this.setState({
            selectedMovie: movie
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

    onRegistration(register) {
        this.setState({
            register,
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }
    render() {
        const { movies, selectedMovie, user, register } = this.state;

        // if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);

        if (!user) return <Row>
            <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
            </Col>
        </Row>

        console.log(user, movies);


        // if (selectedMovie) return <MovieView movie={selectedMovie} />;

        if (movies.length === 0) return <div className="main-view" >Loading...</div>;

        return (

            <Routes>

                {/* <div className="main-view"> */}
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" element={movies.map(m => (

                        <Col xs={6} md={4} lg={3} key={m._id}>
                            <MovieCard movieData={m} />
                        </Col>



                    ))}
                    />

                    <Route path="/movies/:movieId" element={
                        ({ match }) => {
                            return <Col md={8}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                            </Col>
                        }
                    }
                    // render={({ match }) => {
                    //     return <Col md={8}>
                    //         <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                    //     </Col>
                    // }} 
                    />
                </Row>
                {/* </div> */}

            </Routes>






        );




        // return (

        //     <div className="main-view">
        //         <Navbar bg="navColor" variant="dark" expand="lg">
        //             <Container fluid>
        //                 <Navbar.Brand href="#home">MyFlix</Navbar.Brand>
        //                 <Navbar.Toggle aria-controls="basic-navbar-nav" />
        //                 <Navbar.Collapse id="basic-navbar-nav">
        //                     <Nav className="me-auto">
        //                         <Nav.Link href="#home">Movies</Nav.Link>
        //                         <Nav.Link href="#user">Profile</Nav.Link>
        //                         <Nav.Link onClick={() => { this.onLoggedOut() }} href="#logout">Logout</Nav.Link>
        //                     </Nav>
        //                 </Navbar.Collapse>
        //             </Container>
        //         </Navbar>
        //         <div>
        //             <Container>
        //                 {selectedMovie
        //                     ? (
        //                         <Row className="justify-content-lg-center">
        //                             <Col lg={9} >
        //                                 <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
        //                             </Col>
        //                         </Row>
        //                     )
        //                     : (
        //                         <Row className="justify-content-lg-center">
        //                             { movies.map(movie => (
        //                                 <Col xs={6} md={4} lg={3} >
        //                                     <MovieCard key={movie._id} movieData={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie) }} />
        //                                 </Col>
        //                             ))
        //                             }
        //                         </Row>
        //                     )
        //                 }
        //             </Container>
        //         </div>
        //     </div>
        // );
    }
}

export default MainView;