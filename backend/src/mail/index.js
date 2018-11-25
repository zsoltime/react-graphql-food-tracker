'use strict';

const nodemailer = require('nodemailer');

const {
  MAIL_HOST, MAIL_PASS, MAIL_PORT, MAIL_USER,
} = process.env;

const transport = nodemailer.createTransport({
  host: MAIL_HOST,
  port: MAIL_PORT,
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASS,
  },
});

module.exports = {
  transport,
};
