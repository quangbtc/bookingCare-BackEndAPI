import specialtyService from "../services/specialtyService";
let createSpecialty = async (req, res) => {
  try {
    let message = await specialtyService.createSpecialtyService(req.body);
    return res.status(200).json(message);
  } catch (e) {
    console.log("Check error form Server...!", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...!",
    });
  }
};
let getAllSpecialty = async (req, res) => {
  try {
    let message = await specialtyService.getAllSpecialtyService();
    return res.status(200).json(message);
  } catch (e) {
    console.log("Check error form Server...!", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...!",
    });
  }
};
module.exports = {
  createSpecialty: createSpecialty,
  getAllSpecialty: getAllSpecialty,
};
