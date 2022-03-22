// import gql from "graphql-tag";
import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $email: String!) {
    addUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        _id
        email
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
  mutation saveMovie($input: SavedMovieInput) {
    saveMovie(input: $input) {
      username
      _id
      movieCount
      savedMovies {
        movieId
        overview
        poster_path
        release_date
        title
      }
    }
  }
`;

export const REMOVE_MOVIE = gql`
  mutation removeMovie($movieId: String!) {
    removeMovie(movieId: $movieId) {
      _id
      username
      movieCount
      savedMovies {
        movieId
        overview
        poster_path
        release_date
        title
      }
    }
  }
`;