'use strict';

const isEmail = require('validator/lib/isEmail');
const nanoid = require('nanoid');

const { transport } = require('../../mail');

module.exports = async (_, args, ctx) => {
  if (!ctx.request.userId) {
    throw new Error(
      'You must be signed in to update your email address'
    );
  }

  const pendingEmail = args.email.toLowerCase();

  if (!isEmail(pendingEmail)) {
    throw new Error('Email is not valid');
  }

  // check if email is already in use
  const isEmailInUse = await ctx.db.query.user({
    where: { email: pendingEmail },
  });
  if (isEmailInUse) {
    throw new Error('Another user is already using this email');
  }

  const token = nanoid();
  const tokenExpiry = Date.now() + 60 * 60 * 1000; // 1hour

  // set user a pending email
  await ctx.db.mutation.updateUser({
    data: { pendingEmail, token, tokenExpiry },
    where: { id: ctx.request.userId },
  });

  await transport
    .sendMail({
      from: 'Food Tracker Team <noreply@foodtracker.com>',
      to: pendingEmail,
      subject: 'Confirm Your New Email Address',
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
        <p>You recently requested to change your email. Use the button below to confirm your new email address.</p>
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
}/updateEmail?token=${token}">Click here</a></p>
        <p>All the best, <br>Food Tracker Team</p>
      </div>
    `,
    })
    .catch(() => {
      // throw new Error('Error sending email. Please try again later.');
    });

  return { message: 'Email with token sent' };
};
