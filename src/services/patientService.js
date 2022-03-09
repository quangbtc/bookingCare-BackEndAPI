import db from "../models/index";
require("dotenv").config();
import emailService from "./emailService";
import { v4 as uuidv4 } from "uuid";

let buildUrlEmailBooking = (doctorId, token) => {
  let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let createBookingAppointmentService = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !dataInput.email ||
        !dataInput.doctorId ||
        !dataInput.date ||
        !dataInput.timeType ||
        !dataInput.fullName ||
        !dataInput.doctorName
      ) {
        resolve({
          errCode: 1,
          message: "Missing data input",
        });
      } else {
        let token = uuidv4();
        //SEND EMAIL TO PATIENT
        await emailService.sendSimpleEmail({
          email: dataInput.email,
          patientName: dataInput.fullName,
          time: dataInput.timeString,
          doctorName: dataInput.doctorName,
          language: dataInput.language,
          redirectLink: buildUrlEmailBooking(dataInput.doctorId, token),
        });
        //upsert user patient

        let [user, created] = await db.User.findOrCreate({
          where: { email: dataInput.email, roleId: "R3" },
          defaults: {
            email: dataInput.email,
            address: dataInput.address,
            gender: dataInput.genders,
            roleId: "R3",
          },
        });
        //upsert booking patient
        if (user) {
          await db.Booking.findOrCreate({
            where: { patientId: user.id },
            defaults: {
              statusId: "S1",
              doctorId: dataInput.doctorId,
              patientId: user.id,
              date: dataInput.date,
              timeType: dataInput.timeType,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          message: "Create an appointment succeed!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let postVerifyBookingPatientService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.token) {
        resolve({
          errCode: 1,
          message: "Missing data input",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
            statusId: "S1",
          },
          raw: false,
        });
        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            message: "Appointment successful !",
          });
        } else {
          resolve({
            errCode: 2,
            message:
              "The appointment failed, or the appointment does not exist !",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createBookingAppointmentService,
  buildUrlEmailBooking,
  postVerifyBookingPatientService,
};
