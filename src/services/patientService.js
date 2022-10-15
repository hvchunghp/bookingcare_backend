import db from "../models/index";
import emailService from "./emailService";
require("dotenv").config();
import { v4 as uuidv4 } from "uuid";

let buildUrlEmail = (doctorId, token) => {
  let result = `${process.env.URL_REACT}verify-booking?token=${token}&doctorId=${doctorId}`;
  return result;
};

let bookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.email ||
        !data.doctorId ||
        !data.date ||
        !data.timeType ||
        !data.fullname ||
        !data.phoneNumber ||
        !data.gender
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameters",
        });
      } else {
        let token = uuidv4();
        await emailService.sendEmail({
          reciverEmail: data.email,
          patientName: data.fullname,
          doctorName: data.doctorName,
          time: data.timeString,
          language: data.language,
          redirectLink: buildUrlEmail(data.doctorId, token),
        });
        //upsert
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });
        // create booking record
        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: {
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
              doctorId: data.doctorId,
            },
            defaults: {
              email: data.email,
              fullname: data.fullname,
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              dob: data.dob,
              gender: data.gender,
              date: data.date,
              timeType: data.timeType,
              phoneNumber: data.phoneNumber,
              reason: data.reason,
              token: token,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let verifyBooking = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.token || !data.doctorId) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        let appointment = await db.Booking.findOne({
          where: {
            doctorId: data.doctorId,
            token: data.token,
          },
          raw: false,
        });

        if (appointment) {
          appointment.statusId = "S2";
          await appointment.save();
          resolve({
            errCode: 0,
            errMessage: "Confirm appointment success",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Error",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  bookAppointment,
  verifyBooking,
};
