require("dotenv").config();
import nodemailer from "nodemailer";
let sendSimpleEmail = async (data) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_NAME, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });
  let title =
    data.language === "vi"
      ? "Thông tin đặt lịch khám bệnh"
      : "Information to book a medical appointment";
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Hoi Dan IT 👻" <quangsehc1990@gmail.com>', // sender address
    to: data.email, // list of receivers
    subject: title, // Subject line
    html: emailContent(data), // html body
  });
};
let emailContent = (data) => {
  let result = "";
  if (data.language === "vi") {
    result = `
    <h3> Xin chào ${data.patientName} !</h3>
    <p>Bạn vừa đặt lịch khám bện trên Booking Care của chúng tôi.</p>
      <p><strong>Thông tin lịch khám bệnh :</strong></p>
      <div><b>Thời gian khám : ${data.time}</b></div>
      <div><b>Bác sĩ : ${data.doctorName}</b></div>
       
      <p>Nếu thông tin là đúng thì vui lòng click vào link bên dưới để xác nhận thủ tục khám bệnh.</p>

      <div><a href=${data.redirectLink} target="_blank">Click here</a></div>

      <p>Xin chân thành cảm ơn !</p>
    `;
  }
  if (data.language === "en") {
    result = `
    <h3> Hello ${data.patientName} !</h3>
    <p>You have just booked a medical appointment on our Booking Care.</p>
      <p><strong>Information on medical examination schedule :</strong></p>
      <div><b>Examination time : ${data.time}</b></div>
      <div><b>Doctor : ${data.doctorName}</b></div>
       
      <p>If the information is correct, please click on the link below to confirm the medical examination procedure.</p>

      <div><a href=${data.redirectLink} target="_blank">Click here</a></div>

      <p>Sincerely thank !</p>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail,
  emailContent,
};
