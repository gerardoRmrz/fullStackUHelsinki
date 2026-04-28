const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String  
  }
  type Author {
    name: String
    born: Int
    id: ID!
  }  
  type Book {
    title: String!
    published: Int
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type AllAuthors {
      name: String!
      born: Int
    }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: [String]): [Book!]!
    allAuthors: [AllAuthors!]!
    recommendedBooks: [Book]
    filterByGenre(genre: String!): [Book]
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBorn: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book
  }
`;

module.exports = typeDefs;
