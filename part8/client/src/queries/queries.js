import { gql } from "@apollo/client";

export const CURRENT_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
        born
      }
      genres
      id
    }
  }
`;

export const RECOMMENDED = gql`
  query {
    recommendedBooks {
      title
      published
      author {
        name
        born
      }
      genres
    }
  }
`;

export const FILTER_BY_GENRE = gql`
  query filterByGenre($genre: String!) {
    filterByGenre(genre: $genre) {
      title
      published
      author {
        name
        born
        id
      }
      genres
      id
    }
  }
`;

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      author {
        name
        born
      }
      title
      published
      genres
      id
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook(
    $title: String!
    $published: Int
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      author {
        name
        born
      }
      title
      published
      genres
      id
    }
  }
`;

export const SET_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBorn: Int!) {
    editAuthor(name: $name, setBorn: $setBorn) {
      name
      born
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;
