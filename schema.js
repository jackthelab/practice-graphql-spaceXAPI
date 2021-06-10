const axios = require('axios');

const { 
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const baseURL = "https://api.spacexdata.com/v4";
const launchesURL = `${baseURL}/launches`;
const rocketsURL = `${baseURL}/rockets`;

// Launch Type

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    launch_name: { type: GraphQLString },
    launch_date_utc: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    rocketID: { type: GraphQLString }

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

// const RocketType = new GraphQLObjectType({
//   name: 'Rocket',
//   fields: () => ({
//     rocket_id: { type: GraphQLString },

//   })
// })

// Root Query
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
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});