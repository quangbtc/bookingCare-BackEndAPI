import userService from "../services/userService"
let handleUserLogin=async (req,res)=>{
    let email= req.body.email 
    let password=req.body.password
    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message:"Missing input parameter"
        })
    }
    //Lay data tra ve tu db
    let userData= await userService.handleLogin(email,password)
    return res.status(200).json({
        errCode:userData.errCode,
        message:userData.message,
        userData
    })
   
}
let handleGetAllUsers=async (req,res)=>{
    let id=req.query.id // All or Single
    let users= await userService.getAllUsers(id)
    if(!id){
        return res.status(200).json({
            errCode:1,
            message:"Missing parameter input",
            users:[]
        })
    }
    return res.status(200).json({
        errCode:0,
        message:"OK",
        users
    })
    
}
let handleCreateNewUser=async (req,res)=>{
        let message=await userService.createNewUser(req.body)
        return res.status(200).json({
            errCode:message.errCode,
            errMessage:message.errMessage,
            message
        })
}
let handleDeleteUser =async (req,res)=>{
    if(!req.body.id){
        return res.status(200).json({
            errCode:1,
            message:"Missing parameter. Pls try again!"
        })
    }
    let message=await userService.deleteUser(req.body.id)
    return res.status(200).json(message)
}
let handleEditUser=async (req,res)=>{
    let data=req.body
    let message=await userService.updateUser(data)
    return res.status(200).json(message)
}
let getAllCode= async (req,res)=>{
    try {
        let data= await userService.getAllCodeService(req.query.type)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        res.status(200).json({
            errCode:-1,
            errMessage:"Error from server"
        })
    }
}
module.exports={
    handleUserLogin:handleUserLogin,
    handleGetAllUsers:handleGetAllUsers,
    handleCreateNewUser:handleCreateNewUser,
    handleEditUser:handleEditUser,
    handleDeleteUser:handleDeleteUser,
    getAllCode:getAllCode

}