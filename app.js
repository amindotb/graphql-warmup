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
        name:"Inception",
        story:"A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
        producerId:1
    },
    {
        id:2,
        name:"Interstellar",
        story:"A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        producerId:2
    },
    {
        id:3,
        name:"Avengers: Endgame",
        story:"After the devastating events of Avengers: Infinity War (2018), the universe is in ruins.",
        producerId:1
    },
    {
        id:4,
        name:"Forrest Gump",
        story:"The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate and other historical events unfold through the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        producerId:1
    },
    {
        id:5,
        name:"Alita: Battle Angel",
        story:"A deactivated cyborg is revived, but cannot remember anything of her past life and goes on a quest to find out who she is.",
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
        name:"Twentieth Century Fox"
    },
];

const MovieType = new GraphQLObjectType({
    name:"Movie",
    description:"Represents a movie.",
    fields: ()=>({
        id: {type:GraphQLNonNull(GraphQLInt)},
        name: {type:GraphQLNonNull(GraphQLString)},
        story: {type:GraphQLNonNull(GraphQLString)},
        producerId: { type: GraphQLNonNull(GraphQLInt) },
        producer: {
            type: ProducerType,
            resolve: (movie) => {
                return producers.find(producer => producer.id === movie.producerId);
            }
        }             
    })
});

const ProducerType = new GraphQLObjectType({
    name:"ProducerType",
    description:"Represents a Producer.",
    fields: ()=>({
        id: {type:GraphQLNonNull(GraphQLInt)},
        name: {type:GraphQLNonNull(GraphQLString)},
        movies: {
            type: new GraphQLList(MovieType),
            resolve: (producer) =>{
                return movies.filter(movie => movie.producerId === producer.id);
            }
        }         
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        // Objects

        movies: {
            type: new GraphQLList(MovieType),
            description: 'List of All Movie',
            resolve: () => movies
        },
        movie: {
            type: MovieType,
            description: 'A Single Movie',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => movies.find(movie => movie.id === args.id)
        },
        producers: {
            type: new GraphQLList(ProducerType),
            description: 'List of All Producers',
            resolve: () => producers
        },
        producer: {
            type: ProducerType,
            description: 'A Single Producers',
            args: {
                id: { type: GraphQLInt }
            },
            resolve: (parent, args) => producers.find(producer => producer.id === args.id)
        },
        
        // End of objects
    })
});

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
        // Objects

        addMovie: {
            type: MovieType,
            description: 'Add a movie',
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                story: { type: GraphQLNonNull(GraphQLString) },
                producerId: { type: GraphQLNonNull(GraphQLInt) }
            },
            resolve: (parent, args) => {
                const movie = { id: movies.length + 1, name: args.name, story: args.story, producerId: args.producerId };
                movies.push(movie);
                return movie;
            }
        }
        

      // End of objects
    })
  })

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});  

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(5000, () => console.log('Server Running'))