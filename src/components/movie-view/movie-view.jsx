import React from 'react';
import PropTypes from "prop-types";
import './movie-view.scss';
import { Container, Row, Col, Button } from 'react-bootstrap';

export class MovieView extends React.Component {
    render() {
        const { movie, onBackClick } = this.props;

        return (
            <Container fluid className="moviesContainer">
                <Row>
                    <Col>
                        <div className="movie-view">
                            <div className="movie-poster">
                                <img src={movie.ImagePath} />
                            </div>
                            <div className="movie-title">
                                <span className="label">Title: </span>
                                <span className="value">{movie.Title}</span>
                            </div>
                            <div className="movie-description">
                                <span className="label">Description: </span>
                                <span className="value">{movie.Description}</span>
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
    onMovieClick: PropTypes.func.isRequired

};