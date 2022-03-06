import React from 'react';
import PropTypes from "prop-types";
import './movie-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";


export class MovieView extends React.Component {

    constructor(props) {
        super(props);
    }

    addFavoriteMovie() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');

        axios.post(`https://oscarsmyflixapp.herokuapp.com/users/${user}/Favorites/${this.props.movie._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            method: 'POST'

        })
            .then(response => {
                alert(`Added to Favorites`)
            })
            .catch(function (error) {
                console.log(error);
            });


    };
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container fluid className="moviesContainer">
                <Row>
                    <Col>
                        <div className="movie-view">
                            <div className="movie-poster">
                                <img className="poster" src={movie.ImagePath} />
                            </div>
                            <div className="movie-title">
                                <span className="label">Title: </span>
                                <span className="value">{movie.Title}</span>
                            </div>
                            <div className="movie-genre">
                                <span className="label">Genre: </span>
                                <Link to={`/genres/${movie.Genre.Name}`} className="value">{movie.Genre.Name}</Link>
                            </div>
                            <div className="movie-director">
                                <span className="label">Director: </span>
                                <Link to={`/directors/${movie.Director.Name}`} className="value">{movie.Director.Name}</Link>
                            </div>
                            <div className="movie-description">
                                <span className="label">Description: </span>
                                <span className="value">{movie.Description}</span>
                            </div>
                            <div className="movie-button-div">
                                <Button className="movie-button" bg="light" variant="light" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>
                            </div>
                            <div className="movie-button-div">
                                <Button className="movie-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
                            </div>

                        </div>
                    </Col>
                </Row>
            </Container>

        );
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,

};