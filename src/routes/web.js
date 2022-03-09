import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import userDoctorController from "../controllers/userDoctorController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController"
let router = express.Router()

let initWebRoutes = (app) => {
    router.get("/", homeController.getHomePage)
    router.get("/about", homeController.getAbout)
    router.get("/get-crud", homeController.getCRU)
    router.post("/post-crud", homeController.postCRUD)
    router.get("/read-crud", homeController.readCRUD)
    router.get("/edit-crud", homeController.getEditCRUD)
    router.post("/put-crud", homeController.getPutCRUD)
    router.get("/delete-crud", homeController.deleteCRUD)

    //Api
    router.post("/api/login",userController.handleUserLogin)
    router.get("/api/get-all-users",userController.handleGetAllUsers)
    router.post("/api/create-user",userController.handleCreateNewUser)
    router.put("/api/edit-user",userController.handleEditUser)
    router.delete("/api/delete-user",userController.handleDeleteUser)

    router.get("/api/allcode",userController.getAllCode)

    router.get("/api/get-user-doctors",userDoctorController.handleGetUserDoctors)
    router.get("/api/get-all-doctors",userDoctorController.getAllDoctors)
    router.post("/api/create-info-doctors",userDoctorController.createInfoDoctors)
    router.get("/api/get-detail-doctor",userDoctorController.getDetailDoctorById)
    //DOCTOR SCHEDULE
    router.post("/api/create-bulk-doctor-schedule",userDoctorController.createBulkDoctorSchedule)
    router.get("/api/get-schedule-by-date-doctorId",userDoctorController.getScheduleByDateAndDoctorId)
    router.get("/api/get-profile-doctor-by-id",userDoctorController.getProfileDoctorById)

    //PATIENT BOOKING
    router.post("/api/create-patient-booking-appointment",patientController.postPatientBookingAppointment)
    router.post("/api/verify-booking-appointment",patientController.postVerifyBookingPatient)

    //MANAGE SPECIALTY
    router.post("/api/create-specialty",specialtyController.createSpecialty)
    router.get("/api/get-all-specialty",specialtyController.getAllSpecialty)
    return app.use("/", router)
}
module.exports = initWebRoutes