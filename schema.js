const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList} = require('graphql')
const {Book} = require('./models/book');
const {Author} = require('./models/author');

// dummy data
// const books = [
//     {id: "1", name: "Book 1", genera: "doc", authorId: "1"},
//     {id: "2", name: "San Andres", genera: "action", authorId: "2"},
//     {id: "3", name: "Lost", genera: "Drama", authorId: "2"}
// ]
//
// const authors = [
//     {id: "1", name: "Ghada", age: 30},
//     {id: "2", name: "Sara", age: 25}
// ]

// Entities
const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        genera: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args) {
                // return authors.find(object => object.id === parent.authorId);
                return Author.findOne({_id: parent.authorId});
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books.filter(object => object.authorId === parent.id);
                return Book.find({authorId: parent.id});
            }
        }
    })
})

// Root Query
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        // Book Query
        book: {
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return books.find(object => object.id === args.id)
                return Book.findOne({_id: args.id}).lean();
            }
        },
        // Author Query
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                // return authors.find(object => object.id === args.id)
                return Author.findOne({_id: args.id}).lean();
            }
        },
        // All Books
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                // return books;
                return Book.find({}).lean();
            }
        },
        // All Authors
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                // return authors;
                return Author.find({}).lean();
            }
        }
    }
})

// Mutation
const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addBook: {
            type: BookType,
            args: {
                name: {type: GraphQLString},
                genera: {type: GraphQLString},
                authorId: {type: GraphQLID}
            },
            resolve(parent, args) {
                const book = new Book({name: args.name, genera: args.genera, authorId: args.authorId});
                return book.save();
            }
        },
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: GraphQLString},
                age: {type: GraphQLInt}
            },
            resolve(parent, args) {
                const author = new Author({name: args.name, age: args.age});
                return author.save();
            }
        }
    }
})


module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})
