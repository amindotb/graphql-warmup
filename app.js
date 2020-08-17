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


app.listen(5000, () => console.log('Server Running'))