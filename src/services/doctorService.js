import db from "../models/index";
require("dotenv").config();
import _ from "lodash";
let getUserDoctors = (limitInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.Allcode,
            as: "roleData",
            attributes: ["valueVi", "valueEn"],
          },
          {
            model: db.Allcode,
            as: "genderData",
            attributes: ["valueVi", "valueEn"],
          },
        ],
        limit: limitInput,
        order: [["createdAt", "DESC"]],
        where: { roleId: "R2" },
        raw: true,
        nest: true,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
};
let getAllDoctorService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let listDoctors = await db.User.findAll({
        where: { roleId: "R2" },
        attributes: {
          exclude: ["password", "image"],
        },
      });
      resolve(listDoctors);
    } catch (error) {
      reject(error);
    }
  });
};
let createInfoDoctorsService = (inputData) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !inputData.doctorId ||
        !inputData.contentMarkdown ||
        !inputData.contentHtml ||
        !inputData.action
      ) {
        resolve({
          errCode: 1,
          message: "Missing parameter is required !",
        });
      } else {
        if (inputData.action === "ADD") {
          await db.Markdown.create({
            doctorId: inputData.doctorId,
            contentHtml: inputData.contentHtml,
            contentMarkdown: inputData.contentMarkdown,
            description: inputData.description,
          });
        } else if (inputData.action === "EDIT") {
          let doctorMarkdown = await db.Markdown.findOne({
            where: { doctorId: inputData.doctorId },
            raw: false,
          });
          if (doctorMarkdown) {
            doctorMarkdown.doctorId = inputData.doctorId;
            doctorMarkdown.contentHtml = inputData.contentHtml;
            doctorMarkdown.contentMarkdown = inputData.contentMarkdown;
            doctorMarkdown.description = inputData.description;
            await doctorMarkdown.save();
          }
        }

        resolve({
          errCode: 0,
          message: "Add info doctors succeed !",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailDoctorById = (doctorId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let detailDoctor = await db.User.findOne({
        where: { id: doctorId },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Markdown,
            attributes: ["contentHtml", "description", "contentMarkdown"],
          },
          {
            model: db.Allcode,
            as: "positionData",
            attributes: ["valueVi", "valueEn"],
          },
        ],
        nest: true,
        raw: true,
      });
      if (detailDoctor && detailDoctor.image) {
        detailDoctor.image = new Buffer(detailDoctor.image, "base64").toString(
          "binary"
        );
      }
      if (!detailDoctor) {
        detailDoctor = {};
      }
      resolve({
        errCode: 0,
        data: detailDoctor,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let createBulkDoctorScheduleService = (dataInput) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!dataInput.arrSchedule || !dataInput.doctorId || !dataInput.date) {
        resolve({
          errCode: 1,
          message: "Missing data input",
        });
      } else {
        let arrSchedule = dataInput.arrSchedule;
        if (arrSchedule && arrSchedule.length > 0) {
          arrSchedule = arrSchedule.map((item) => {
            item.maxNumber = process.env.MAX_NUMBER;
            return item;
          });
        }
        //GET OLD DATE WITH DOCTORID AND DATE CONDITION
        let scheduleExist = await db.Schedule.findAll({
          where: { doctorId: dataInput.doctorId, date: dataInput.date },
          attributes: ["maxNumber", "date", "timeType", "doctorId"],
          raw: false,
        });
        //FORMAT DATE TYPE
        // if (scheduleExist && scheduleExist.length > 0) {
        //   scheduleExist = scheduleExist.map((item) => {
        //     item.date = new Date(item.date).getTime();
        //     return item;
        //   });
        // }

        //CHECK DIFFERENT
        let toCreateDoctorSchedule = _.differenceWith(
          arrSchedule,
          scheduleExist,
          (a, b) => {
            return a.timeType === b.timeType && a.date === b.date;
          }
        );
        console.log("Check datainput", arrSchedule);
        // ADD TO DATABASE
        if (toCreateDoctorSchedule && toCreateDoctorSchedule.length > 0) {
          await db.Schedule.bulkCreate(toCreateDoctorSchedule);
          resolve({
            errCode: 0,
            message: "Create doctor schedule successfully",
          });
        } else {
          resolve({
            errCode: 2,
            message: "Data already exits",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getScheduleDoctorService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.doctorId || !data.date) {
        resolve({
          errCode: 1,
          message: "Missing parameter input",
        });
      } else {
        let dateData = data.date.toString();
        let doctorIdData = parseInt(data.doctorId);

        let response = await db.Schedule.findAll({
          where: {
            doctorId: doctorIdData,
            date: dateData,
          },
          raw: true,
        });
        resolve({
          errCode: 0,
          data: response,
          message: "Get data successfully",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  getUserDoctors: getUserDoctors,
  getAllDoctorService: getAllDoctorService,
  createInfoDoctorsService: createInfoDoctorsService,
  getDetailDoctorById: getDetailDoctorById,
  createBulkDoctorScheduleService: createBulkDoctorScheduleService,
  getScheduleDoctorService: getScheduleDoctorService,
};
