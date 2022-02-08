import db from "../models/index";
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);
let handleLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
          let user =await db.User.findOne({
              where:{
                  email:email
              },
              attributes:['email','roleId','password','firstName','lastName'],
              raw:true        
          })
          if(user){
           let checkPassword= await bcrypt.compareSync(password, user.password);
           console.log(checkPassword)
           if(checkPassword){
               userData.errCode=0
               userData.message='OK'
               delete user.password
               userData.user=user
           }else{
               userData.errCode=3
               userData.message="Wrong password"
           }
          }else{
            userData.errCode = 2;
            userData.message = "User not found";
          }
        //Neu email ton tai
        //Compare password
      } else {
        userData.errCode = 1;
        userData.message = "Email is not exist in our system";
      }
      resolve(userData)
    } catch (e) {
      reject(e);
    }
   
  });
};

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve,reject)=>{
        try {
            let user= await db.User.findOne({
                where:{email:userEmail}
            })
            if(user){
                resolve(true)
            }
            else{
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
};
let getAllUsers=(userId)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            let users=""
            if(userId==="ALL"){
                users=await db.User.findAll({
                    attributes:{
                        exclude:['password']
                    },
                })  
            }
            if(userId && userId !== "ALL"){
                users=await db.User.findOne({
                    where:{
                        id:userId
                    },
                    attributes:{
                        exclude:['password']
                    },             
                })
            }
            resolve(users)
            
        } catch (e) {
            reject(e)
        }
    })

}
let createNewUser=(data)=>{
   return new Promise(async (resolve,reject)=>{
       try {
           //check email
           let check=await checkUserEmail(data.email)
           if(check===true){
               resolve({
                   errCode:1,
                   errMessage:"Your email already exist in our system! Pls try another email!",

               })
           }else{
               let hashPasswordFromBcrypt = await hashUserPassword(data.password)
               await db.User.create({
                   email: data.email,
                   password: hashPasswordFromBcrypt,
                   firstName: data.firstName,
                   lastName: data.lastName,
                   address: data.address,
                   phoneNumber: data.phoneNumber,
                   gender: data.gender,
                   roleId: data.roleId,
                   positionId:data.positionId,
                   image:data.image
               })
               resolve({
                   errCode:0,
                   errMessage:"User adding succeed"
               })
           }
           
       } catch (e) {
           reject(e)
       }
   })
}
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}
let deleteUser=(userId)=>{
    return new Promise(async (resolve,reject)=>{
        try {
           let user =await db.User.findOne({
               where:{id:userId}
           }) 
           if(!user){
               resolve({
                   errCode:2,
                   message:"User is not exist"
               })
           }
           await db.User.destroy({
            where:{id:userId}
           })
           resolve({
               errCode:0,
               message:"The user was deleted."
           })
        } catch (e) {
            reject(e)
        }
    })
}
let updateUser=(data)=>{
    return new Promise(async (resolve,reject)=>{
        try {
            if(!data.id){
                resolve({
                    errCode:2,
                    message:"Missing required parameters"
                })
            }
            let user= await db.User.findOne({
                where:{id:data.id},
                raw:false
            })
            if(user){
                user.firstName=data.firstName
                user.lastName=data.lastName
                user.address=data.address
                user.phoneNumber=data.phoneNumber
                user.roleId=data.roleId
                user.gender=data.gender
                user.positionId=data.positionId
                user.image=data.image
                //Luu du lieu vao db
                await user.save()
                resolve({
                    errCode:0,
                    message:"Update user successfully!"
                })
            }else{
                resolve({
                    errCode:1,
                    message:"User not found."

                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
let getAllCodeService=(typeInput)=>{
    return new Promise(async (resolve,reject)=>{
       
            try {
                if(!typeInput){
                    resolve({
                        errCode:1,
                        errMessage:"Missing required parameter !"
                    })
                }else{
                    let response={}
                    let allCode= await db.Allcode.findAll({
                        where:{type:typeInput}
                    })
                    response.errCode=0
                    response.data=allCode
                    resolve(response)
                }
               
            } catch (e) {
                reject(e)
            }
            
       
       
    })
}
module.exports = {
  handleLogin: handleLogin,
  getAllUsers:getAllUsers,
  createNewUser:createNewUser,
  deleteUser:deleteUser,
  updateUser:updateUser,
  getAllCodeService:getAllCodeService
};
