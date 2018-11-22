'use strict';

require('dotenv').config();

const server = require('./server')();

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  ({ endpoint, port }) => console.log(
    `GraphQL server is running on http://localhost:${port}${endpoint}`
  )
);
