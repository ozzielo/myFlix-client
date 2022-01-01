import React from 'react';
import axios from 'axios';
import './main-view.scss';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { NavBarView } from '../navbar-view/navbar';
import { UserView } from '../profile-view/profile-view'
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

export class MainView extends React.Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            favorites: []
        }
        this.getUser = this.getUser.bind(this)

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

    getUser() {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        axios.get(`https://oscarsmyflixapp.herokuapp.com/users/${user}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                this.setState({
                    username: response.data.Username,
                    password: response.data.Password,
                    email: response.data.Email,
                    birthday: response.data.Birthday,
                    favorites: response.data.FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    render() {
        const { movies, username, password, email, birthday, favorites, user, register } = this.state;
        //  if (!user) return <Row>
        //     <Col>
        //         <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
        //     </Col>
        // </Row>
        // if (movies.length === 0) return <div className="main-view" />;
        console.log('!', movies[0])

        return (
            <Router>
                <Route exact path="/" render={() => {
                    console.log('login')
                    if (user) return <NavBarView user={user} />;

                    if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;


                }} />


                <Route exact path="/register" render={() => {
                    if (user) return <Redirect to="/" />
                    return <RegistrationView />
                }} />



                <div className="main-view ">
                    <Row className="main-view justify-content-md-center">
                        <Route exact path="/" render={() => {


                            return movies.map(m => (
                                <Col xs={6} md={4} lg={3} key={m._id}>
                                    <br />
                                    <br />

                                    <MovieCard movieData={m} />
                                </Col>
                            ))
                        }} />
                        <Route path="/movies/:movieId" render={({ match, history }) => {
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col lg={9}>
                                <NavBarView user={user} />
                                <br />
                                <br />
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)}
                                    onBackClick={() => history.goBack()} />
                            </Col>
                        }} />
                        <Route exact path="/genres/:name" render={({ match, history }) => {

                            // get alll movies for a genre

                            // 1. get a list of all movies
                            // 2. determine the gennre for each movie
                            // 3. keep only those moviess whose gennre iss our target genre

                            let targetGenreMovies = []

                            movies.forEach((movie) => {
                                const movieGenreName = movie.Genre.Name
                                const targetGenreName = match.params.name
                                console.log('>', movieGenreName, targetGenreName)

                                if (movieGenreName === targetGenreName) {
                                    // if this is the case, then we have found a movie for target genre
                                    targetGenreMovies.push(movie)
                                }
                            })
                            console.log('targetGenreMovies', targetGenreMovies)

                            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col lg={9}>
                                <NavBarView user={user} />
                                <br />
                                <br />
                                <br />
                                <GenreView movieData={targetGenreMovies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                            </Col>

                        }

                        } />
                        <Route exact path="/directors/:name" render={({ match, history }) => {

                            let targetDirectorMovies = []

                            movies.forEach((movie) => {
                                const movieDirectorName = movie.Director.Name
                                const targetDirectorName = match.params.name
                                console.log('>', movieDirectorName, targetDirectorName)

                                if (movieDirectorName === targetDirectorName) {
                                    // if this is the case, then we have found a movie for target genre
                                    targetDirectorMovies.push(movie)
                                }
                            })
                            console.log('targetDirectorMovies', targetDirectorMovies)

                            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col lg={9}>
                                <NavBarView user={user} />
                                <br />
                                <br />
                                <br />


                                <DirectorView movieData={targetDirectorMovies} director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                            </Col>
                        }

                        } />
                        <Route exact path="/users/:username" render={({ match, history }) => {
                            console.log('Gott Userrrrr')



                            if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
                            if (movies.length === 0) return <div className="main-view" />;
                            return <Col lg={9}>

                                <NavBarView user={user} />
                                <br />
                                <br />
                                <br />
                                <UserView username={username} password={password} email={email}
                                    birthday={birthday} favorites={favorites} movieData={movies}
                                    getUser={this.getUser}
                                    onBackClick={() => history.goBack()} removeMovie={(_id) => this.onRemoveFavorite(_id)} />



                            </Col>

                        }
                        } />

                    </Row>
                </div>
            </Router>
        );






        // if (!register) return (<RegistrationView onRegistration={(register) => this.onRegistration(register)} />);

        // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

        // if (selectedMovie) return <MovieView movie={selectedMovie} />;

        // if (movies.length === 0) return <div className="main-view" />;
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