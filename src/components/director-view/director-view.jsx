import React from 'react';
import PropTypes from "prop-types";
import { MovieCard } from '../movie-card/movie-card';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

export class DirectorView extends React.Component {
    render() {
        const { movieData, director, onBackClick } = this.props

        return (
            <Container>
                <Card>

                    <Card.Body>
                        <Card.Title>DIRECTOR</Card.Title>
                        <div>
                            <span className="label">Name: </span>
                            <span className="value">{director.Name}</span>
                        </div>
                        <div>
                            <span className="label">Bio: </span>
                            <span className="value">{director.Bio}</span>
                        </div>
                        <div>
                            <span className="label">Born: </span>
                            <span className="value">{director.Birth}</span>
                        </div>
                        <div className="director-button-div">
                            <Button className="director-button" bg="dark" variant="dark" onClick={() => { onBackClick(null); }}>Back</Button>
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

DirectorView.proptypes = {
    Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string,
        Birth: PropTypes.number,
    }).isRequired,
};
