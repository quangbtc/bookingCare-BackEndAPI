import db from "../models/index";

let createSpecialtyService = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.image ||
        !data.specialtyName ||
        !data.descriptionHtml ||
        !data.descriptionMarkdown
      ) {
        resolve({
          errCode: 1,
          message: "Missing parameter input !",
        });
      } else {
        let specialty = await db.Specialty.create({
          specialtyName: data.specialtyName,
          descriptionHtml: data.descriptionHtml,
          descriptionMarkdown: data.descriptionMarkdown,
          image: data.image,
        });
        if (specialty) {
          resolve({
            errCode: 0,
            message: "Create specialty succeed !",
          });
        }
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllSpecialtyService = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let dataSpecialty = await db.Specialty.findAll();
      if (dataSpecialty && dataSpecialty.length > 0) {
        dataSpecialty.map((item) => {
          item.image = new Buffer(item.image, "base64").toString("binary");
          return item;
        });
        resolve({
          errCode: 0,
          message: "Get specialty success !",
          data: dataSpecialty,
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createSpecialtyService: createSpecialtyService,
  getAllSpecialtyService: getAllSpecialtyService,
};
