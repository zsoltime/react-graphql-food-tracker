'use strict';

const isEmail = require('validator/lib/isEmail');
const nanoid = require('nanoid');

const { transport } = require('../../mail');

module.exports = async (_, args, ctx) => {
  const email = args.email.toLowerCase();

  if (!isEmail(email)) {
    throw new Error('Email address is invalid');
  }

  const user = await ctx.db.query.user({ where: { email } });

  if (!user) {
    throw new Error(
      'Email address not found. You may have entered your email address incorrectly.'
    );
  }

  const token = nanoid();
  const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1hour

  const res = await ctx.db.mutation.updateUser({
    where: { email },
    data: { token, tokenExpiry },
  });

  // const mailRes =
  await transport
    .sendMail({
      from: 'Food Tracker Team <noreply@foodtracker.com>',
      to: user.email,
      subject: 'Your Password Reset Token',
      html: `
      <div style="
        border: 1px solid #444;
        color: #444;
        font-family: sans-serif;
        font-size: 1.25rem;
        font-weight: 300;
        line-height: 1.5;
        padding: 1.25rem;
      ">
        <h2>Hello There!</h2>
        <p>Your password reset token is here!</p>
        <p><a style="
        background-color: #eb5190;
        border-radius: 2px;
        color: #fff;
        display: block;
        font-size: 1.5rem;
        margin:1rem auto;
        padding: 0.5rem 2rem;
        text-align:center;
        text-decoration: none
        " href="${
  process.env.FRONTEND_URL
}/reset?token=${token}">Click here</a></p>
        <p>All the best, <br>Food Tracker Team</p>
      </div>
    `,
    })
    .catch(() => {
      // throw new Error('Error sending email. Please try again later.');
    });

  return { message: 'Email with token sent' };
};
