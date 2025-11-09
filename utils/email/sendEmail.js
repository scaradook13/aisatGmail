require("dotenv").config();
const nodemailer = require("nodemailer");
const fs = require("fs");
const handlebars = require("handlebars");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (to, subject, templateName, context) => {
  const templatePath = path.join(__dirname, "template", `${templateName}.handlebars`);
  const source = fs.readFileSync(templatePath, "utf8");
  const compiledTemplate = handlebars.compile(source);

  const mailOptions = {
    from: `"AISAT BALIWAG" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html: compiledTemplate(context),
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
