import db from "../models/index";
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
module.exports = {
  getUserDoctors: getUserDoctors,
  getAllDoctorService: getAllDoctorService,
  createInfoDoctorsService: createInfoDoctorsService,
  getDetailDoctorById: getDetailDoctorById,
};
