import React, { useState } from 'react';
import { useQuery, useLazyQuery, gql } from '@apollo/client';

const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      id
      name
      age
      nationality
      username
    }
  }
`;

const QUERY_ALL_MOVIES = gql`
  query Movie {
    movies {
      id
      name
      yearOfPublication
      isInTheatres
    }
  }
`;

const QUERY_GET_MOVIE_BY_NAME = gql`
  query getMovieByName($name: String!) {
    movie(name: $name) {
      name
      yearOfPublication
    }
  }
`;

const DisplayData = (props) => {
  const { data, uLoading, error } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(QUERY_GET_MOVIE_BY_NAME);

  const [movieSearch, setMovieSearch] = useState('');

  if (error) console.log(error);

  if (movieError) console.log(movieError);

  return uLoading ? (
    <h1>User Data is loading...</h1>
  ) : (
    <div>
      {data &&
        data.users.map((user) => {
          return (
            <div>
              <h1>Name: {user.name}</h1>
              <h1>Username: {user.username}</h1>
              <h1>Age: {user.age}</h1>
              <h1>Nationality: {user.nationality}</h1>
            </div>
          );
        })}
      {movieData &&
        movieData.movies.map((movie) => {
          return (
            <div>
              <h1>Movie Name: {movie.name}</h1>
              <h1>Year of Publication: {movie.yearOfPublication}</h1>
              <h1>is in theatres: {movie.isInTheatres}</h1>
            </div>
          );
        })}
      <div>
        <input
          type='text'
          placeholder='Interstellar...'
          onChange={(e) => setMovieSearch(e.target.value)}
          value={movieSearch}
        />
        <button
          onClick={() => fetchMovie({ variables: { name: movieSearch } })}
        >
          Fetch Data
        </button>
        <div>
          {movieSearchData && (
            <div>
              <h1>Movie Name: {movieSearchData.movie.name}</h1>
              <h1>
                Year of Publication: {movieSearchData.movie.yearOfPublication}
              </h1>
            </div>
          )}
          {movieError && <h1>There was an error in fetching data</h1>}
        </div>
      </div>
    </div>
  );
};

export default DisplayData;
