'use strict';

const { GraphQLServer } = require('graphql-yoga');

const db = require('../db');
const mutations = require('../mutations');
const queries = require('../queries');

const context = req => ({ ...req, db });
const resolvers = {
  Mutation: mutations,
  Query: queries,
};
const resolverValidationOptions = {
  requireResolversForResolveType: false,
};
const typeDefs = 'src/schema.graphql';

module.exports = () => new GraphQLServer({
  context,
  resolvers,
  resolverValidationOptions,
  typeDefs,
});
