const axios = require('axios');

const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat
} = require('graphql');

// URL Abstractions

const baseURL = "https://api.spacexdata.com/v4";
const launchesURL = `${baseURL}/launches`;
const rocketsURL = `${baseURL}/rockets`;

// Launch Type

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    id: { type: GraphQLString },
    flight_number: { type: GraphQLInt },
    name: { type: GraphQLString },
    date_utc: { type: GraphQLString },
    date_local: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    // rocket: { type: GraphQLString }
    
    // Inserting the associated RocketType object with the UUID that the "parent" (i.e., current LaunchType object) has access to
    rocket: {
      type: RocketType,
      resolve(parent, args) {
        return axios
          .get(`${rocketsURL}/${parent.rocket}`)
          .then(res => res.data);
      }
    }

    /* 

    In tutorial, v3 of api is being used.
    In v3 there is a nested object for the rocket.
    This nested object is used to create a better RocketType object
    I will write the code example from the tutorial and comment out but
    Will receive the rocketID (type: UUID) in v4 request and deal with rockets differently
    To start I will simply return the id string but will look for alternatives

    rocket: { type: RocketType }

    */
  })
})

// Rocket Type

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    type: { type: GraphQLString },
    active: { type: GraphQLBoolean },
    success_rate_pct: { type: GraphQLFloat },
    description: { type: GraphQLString }
  })
})

// Root Query

/*
Tutorial variance note:

v4 is using an id instead of a flight_number for the purposes of querying individual launches
Because of this, I've added an id on RocketType and LaunchType that did not exist in the tutorial.
This also changes the arg type for launch and rocket in the 'fields' object below to GraphQLString instead of GraphQLInt

*/

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {

        // using axios instead of fetch

        return axios
          .get(launchesURL)
          .then(res => res.data);

      }
    },
    launch: {
      type: LaunchType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`${launchesURL}/${args.id}`)
          .then(res => res.data);
      }
    },
    rockets: {
      type: new GraphQLList(RocketType),
      resolve(parent, args) {
        return axios
          .get(rocketsURL)
          .then(res => res.data)
      }
    },
    rocket: {
      type: RocketType,
      args: {
        id: { type: GraphQLString }
      },
      resolve(parent, args) {
        return axios
          .get(`${rocketsURL}/${args.id}`)
          .then(res => res.data);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});