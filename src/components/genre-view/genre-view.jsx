import React from 'react';
import PropTypes from "prop-types";
import { MovieCard } from '../movie-card/movie-card';
// import './genre-view.scss';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';


export class GenreView extends React.Component {
    render() {
        const { movieData, genre, onBackClick } = this.props

        console.log(movieData)

        // either we generate the list of movies here
        // or we recieve it as a prop

        return (
            <Container>
                <Card>

                    <Card.Body>
                        <Card.Title>GENRE</Card.Title>
                        <div>
                            <span className="label">Name: </span>
                            <span className="value">{genre.Name}</span>
                        </div>
                        <div>
                            <span className="label">Description: </span>
                            <span className="value">{genre.Description}</span>
                        </div>
                        <div className="genre-button-div">
                            <Button className="genre-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
                        </div>
                    </Card.Body>
                </Card>
                <Row>

                    {movieData.map(m => (
                        <Col xs={6} md={4} lg={3} key={m._id}>
                            <MovieCard movieData={m} />
                        </Col>
                    ))}
                </Row>

            </Container>
        );
    }
}

GenreView.proptypes = {
    Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string,
    }).isRequired,
};
