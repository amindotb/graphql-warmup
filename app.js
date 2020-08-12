const express = require('express')
const { graphqlHTTP } = require("express-graphql");
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLInt,
  GraphQLNonNull
} = require('graphql')
const app = express()

const movies = [
    {
        id:1,
        name:"Start trak",
        decription:"A good movie",
        producerId:1
    },
    {
        id:2,
        name:"Night at sky",
        decription:"Some other movie",
        producerId:2
    }
];

const producers = [
    {
        id:1,
        name:"Sony"
    },
    {
        id:2,
        name:"Disney"
    },
];

const MovieType = new GraphQLObjectType({
    name:"Movie",
    description:"Represents  a movie.",
    fields: ()=>({
        id: {type:GraphQLNonNull(GraphQLInt)},
        name: {type:GraphQLNonNull(GraphQLString)},
        decription: {type:GraphQLNonNull(GraphQLString)},
        producerId: { type: GraphQLNonNull(GraphQLInt) }             
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
      movie: {
        type: MovieType,
        description: 'A Single Movie',
        args: {
          id: { type: GraphQLInt }
        },
        resolve: (parent, args) => movies.find(movie => movie.id === args.id)
      },
     
    })
  })

const schema = new GraphQLSchema({
    query: RootQueryType,
});  

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(5000, () => console.log('Server Running'))