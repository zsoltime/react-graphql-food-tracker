'use strict';

require('dotenv').config();

const cookieParser = require('cookie-parser');

const addUserID = require('./server/middlewares/addUserID');
const server = require('./server')();

server.express.use(cookieParser());
server.express.use(addUserID);

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
