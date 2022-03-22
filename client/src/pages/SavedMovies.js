import React from "react";
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Button,
} from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/react-hooks";

import Auth from "../utils/auth";
import { removeMovieId, saveMovieIds } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { REMOVE_MOVIE } from "../utils/mutations";

const SavedMovies = () => {
  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || [];

  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }
    try {
      const response = await removeMovie({
        variables: { movieId: movieId.toString() },
      });

      if (!response) {
        throw new Error("something went wrong!");
      }
      removeMovieId(movieId);
    } catch (err) {
      console.error(error);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  // sync localStorage with what was returned from the userData query
  const savedMovieIds = userData.savedMovies.map((movie) => movie.movieId);
  saveMovieIds(savedMovieIds);

  return (
    <>
      <Jumbotron fluid className="text-light bg-dark">
        <Container>
          <h1>Viewing saved Movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? "movie" : "movies"
              }:`
            : "You have no saved movies!"}
        </h2>
        <CardColumns>
          {userData.savedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border="dark">
                {movie.poster_path ? (
                  <Card.Img
                    src={movie.poster_path}
                    alt={`The cover for ${movie.title}`}
                    variant="top"
                  />
                ) : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className="small">Release Date: {movie.release_date}</p>
                  <Card.Text>{movie.overview}</Card.Text>
                  <Button
                    className="btn-block btn-danger"
                    onClick={() => handleDeleteMovie(movie.movieId)}
                  >
                    Delete this movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;