import patientService from "../services/patientService"
let  postPatientBookingAppointment=async(req,res)=>{
    try {
        let message=await patientService.createBookingAppointmentService(req.body)
        return res.status(200).json(message)
    } catch (e) {
        console.log("Check error cause:",e)
        return res.status(200).json({
            errCode:-1,
            message:"Error from server"
        })
    }
}
let postVerifyBookingPatient=async(req,res)=>{
    try {
        let message=await patientService.postVerifyBookingPatientService(req.body)
        return res.status(200).json(message)
        
    } catch (e) {
        console.log("Check error cause:",e)
        return res.status(200).json({
            errCode:-1,
            message:"Error from server !"
        })
    }

}
module.exports={
    postPatientBookingAppointment,
    postVerifyBookingPatient
}