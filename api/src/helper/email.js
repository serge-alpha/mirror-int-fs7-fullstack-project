const nodemailer = require("nodemailer");
const dev = require("../config");

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  tls:{
    rejectUnauthorized:false
  },
  auth: {
    user: dev.app.emailAccont_username ,
    pass: dev.app.emailAccont_password ,
  },
})
 const sendEmailWithNodeMailer = async (emailData) => {
  try {
    //const emailData = req.body.emailData;

    const mailOptions = {
      from: dev.app.emailAccont_username,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    }
    console.log(dev.app)
    const info = await transporter.sendMail(mailOptions)
    console.log(info)
  } catch (error) {
    console.log('---SMTP ERROR2---')
    console.log('problem sending Email:', error)
    throw error
  }
}

module.exports= sendEmailWithNodeMailer;





