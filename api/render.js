const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async (request, response) => {
  const body = request.body;
  console.log("body", body);
  const msg = {
    to: body.email,
    from: "canhua.mao@gmail.com", // Use the email address or domain you verified above
    subject: `${body.email} want to try commercial version `,
    text: `Email: ${body.email}`,
    html: `<strong>Email: ${body.email}</strong>`,
  };

  await sgMail.send(msg);
  response.status(200).send({});
};
