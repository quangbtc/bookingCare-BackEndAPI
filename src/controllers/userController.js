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
    let id=req.body.id // All or Single
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
module.exports={
    handleUserLogin:handleUserLogin,
    handleGetAllUsers:handleGetAllUsers
}