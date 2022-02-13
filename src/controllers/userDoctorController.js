import doctorService from "../services/doctorService";

let handleGetUserDoctors = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) limit = 10;
  try {
    let response = await doctorService.getUserDoctors(+limit);
    return res.status(200).json({
      errCode: 0,
      data: response,
    });
  } catch (error) {
    console.log("Error from server", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server",
    });
  }
};
let getAllDoctors = async (req, res) => {
  try {
    let doctors = await doctorService.getAllDoctorService();
    return res.status(200).json({
      errCode: 0,
      data: doctors,
    });
  } catch (error) {
    console.log("Error status", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...!",
    });
  }
};
let createInfoDoctors = async (req, res) => {
  try {
    let message = await doctorService.createInfoDoctorsService(req.body);
    return res.status(200).json(message);
  } catch (e) {
    console.log("Error from server", e);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...!",
    });
  }
};
let getDetailDoctorById = async (req, res) => {
  try {
    let doctorId = req.query.id;
    if (!doctorId) {
      return res.status(200).json({
        errCode: 1,
        message: "Missing parameter...",
      });
    } else {
      let detailDoctor = await doctorService.getDetailDoctorById(+doctorId);
      return res.status(200).json(detailDoctor);
    }
  } catch (error) {
    console.log("Error from server...");
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};
let createBulkDoctorSchedule = async (req, res) => {
  try {
    let message = await doctorService.createBulkDoctorScheduleService(req.body);
    return res.status(200).json(message);
  } catch (error) {
    console.log("Error from server", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server.",
    });
  }
};
let getScheduleByDateAndDoctorId = async (req, res) => {
  let data = req.query;
  try {
    let response = await doctorService.getScheduleDoctorService(data);
    return res.status(200).json(response);
  } catch (error) {
    console.log("Error from server", error);
    return res.status(200).json({
      errCode: -1,
      message: "Have error from server...",
    });
  }
};
module.exports = {
  handleGetUserDoctors: handleGetUserDoctors,
  getAllDoctors: getAllDoctors,
  createInfoDoctors: createInfoDoctors,
  getDetailDoctorById: getDetailDoctorById,
  createBulkDoctorSchedule: createBulkDoctorSchedule,
  getScheduleByDateAndDoctorId: getScheduleByDateAndDoctorId,
};
