import nodemailer from "nodemailer";

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, subject: string, html: string) {
  // let testAccount = await nodemailer.createTestAccount();
  // console.log({ testAccount });

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "vfk7aslmb3ravuaj@ethereal.email",
      pass: "PAXBX9NtPfzDE5Qukw",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"justaway" <justaway64@example.com>', // sender address
    to, // list of receivers
    subject: subject, // Subject line
    html, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
