// import gql from "graphql-tag";
import { gql } from "@apollo/client";



export const GET_ME = gql`
  {
    me {
      _id
      username
      email
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