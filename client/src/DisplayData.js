import React, { useState } from 'react';
import { useQuery, useLazyQuery, gql, useMutation } from '@apollo/client';

const QUERY_ALL_USERS = gql`
  query getAllUsers {
    users {
      ... on UserSuccess {
        users {
          id
          name
          age
          nationality
          username
        }
      }
      ... on UserError {
        message
      }
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

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      name
      id
    }
  }
`;

const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      name
      id
    }
  }
`;

const DisplayData = (props) => {
  const { data, loading, refetch } = useQuery(QUERY_ALL_USERS);
  const { data: movieData } = useQuery(QUERY_ALL_MOVIES);
  const [fetchMovie, { data: movieSearchData, error: movieError }] =
    useLazyQuery(QUERY_GET_MOVIE_BY_NAME);

  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER_MUTATION);

  const [movieSearch, setMovieSearch] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState('');
  const [nationality, setNationality] = useState('');
  const [id, setId] = useState('');

  return loading ? (
    <h1>User Data is loading...</h1>
  ) : (
    <div>
      <div>
        <input
          type='text'
          placeholder='Name...'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type='number'
          placeholder='Age...'
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type='text'
          placeholder='username...'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='text'
          placeholder='Nationality...'
          value={nationality}
          onChange={(e) => setNationality(e.target.value.toUpperCase())}
        />
        <button
          onClick={() => {
            createUser({
              variables: {
                input: { name, age: Number(age), nationality, username },
              },
            });
            refetch();
          }}
        >
          Create User
        </button>
      </div>
      <div>
        <input
          type='text'
          placeholder='ID...'
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button
          onClick={() => {
            deleteUser({ variables: { id } });
            refetch();
          }}
        >
          Delete User
        </button>
      </div>
      {data &&
        data.users.users.map((user) => {
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
