import React from 'react';
import { Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
    render() {
        const { movieData, onMovieClick } = this.props;
        return (
            <Container className="movieContainer">
                <Row>
                    <Col>
                        <CardGroup>
                            <Card className="movieCard">
                                <Card.Img className="cardImage" variant="top" src={movieData.ImagePath} />
                                <Card.Body>
                                    <Card.Title>{movieData.Title}</Card.Title>
                                    <Card.Text>{movieData.Description}</Card.Text>
                                    <Link to={`/movies/${movieData._id}`}>
                                        <Button variant="link">Open</Button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}
