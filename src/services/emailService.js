require("dotenv").config();
import nodemailer from "nodemailer";
let sendEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Chung Hoang" <chunhp@gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: getSubject(dataSend),
    html: getBodyHTMLEmail(dataSend),
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result;
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}</h3>
    <p>
        Có phải bạn vừa đặt lịch khám bệnh trên bookingcare?
    </p>
    <p>
        Thông tin đặt lịch khám bệnh:
    </p>
    <div><b>Thời gian khám bệnh: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
    <p>
    <a href=${dataSend.redirectLink} target="_blank">
        Xác nhận đặt lịch
    </a>
    </p>
    `;
  }
  if (dataSend.language === "en") {
    result = `
<h3>Dear ${dataSend.patientName}</h3>
<p>
Did you just book an appointment on bookingcare?
</p>
<p>
Information to schedule an appointment:
</p>
<div><b>Medical examination time: ${dataSend.time}</b></div>
<div><b>Doctor: ${dataSend.doctorName}</b></div>
<p>
<a href=${dataSend.redirectLink} target="_blank">
Booking Confirmation
</a>
</p>
`;
  }
  return result;
};

let getSubject = (dataSend) => {
  let title;
  if (dataSend.language === "vi") {
    title = "Thông tin đặt lịch khám bệnh";
  }
  if (dataSend.language === "en") {
    title = "Information to book a medical appointment";
  }
  return title;
};

module.exports = {
  sendEmail,
};
