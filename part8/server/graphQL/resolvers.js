const { PubSub } = require("graphql-subscriptions");
const User = require("../models/user");
const Author = require("../models/author");
const Book = require("../models/book");

const jwt = require("jsonwebtoken");
const pubSub = new PubSub();

const resolvers = {
  Book: {
    author: async (root) => {
      const result = await Author.findById(root.author.id.toString());
      return {
        id: root.author.id.toString(),
        name: result.name,
        born: result.born,
      };
    },
  },
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (Object.keys(args).length === 0) {
        return await Book.find({});
      }

      if (args.genre) {
        const allBooksGenre = await Book.find({ genres: { $all: args.genre } });
        return allBooksGenre;
      }
    },
    allAuthors: async () => {
      return Author.find({});
    },
    recommendedBooks: async (root, _, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      return await Book.find({
        genres: { $all: currentUser.favoriteGenre },
      });
    },
    filterByGenre: async (root, args) => {
      return Book.find({ genres: { $all: args.genre } });
    },
    me: (root, _, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      if (args.author.length <= 3) {
        throw new GraphQLError("Author name too short, must be > 4", {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
      if (args.title.length <= 3) {
        throw new GraphQLError("Title name too short, must be > 4", {
          extensions: { code: "BAD_USER_INPUT " },
        });
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author, born: args.born });
        await author.save();
      }

      console.log("AddBook: ", author);

      const newBook = new Book({
        ...args,
        author: author._id,
      });

      await newBook.save();

      await newBook.populate("author");

      console.log("newBook resolver : ", newBook);

      pubSub.publish("BOOK_ADDED", {
        bookAdded: newBook,
      });

      return newBook;
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new GraphQLError("not authenticated", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }
      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBorn;
      await author.save();
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new GraphQLError("Creating the user failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== "secret") {
        throw new GraphQLError("wrong credentials", {
          extensions: {
            code: "BAD_USER_INPUT",
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      };
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterableIterator(["BOOK_ADDED"]),
    },
  },
};

module.exports = resolvers;
