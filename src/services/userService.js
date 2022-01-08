import db from "../models/index";
import bcrypt from 'bcryptjs'
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
              attributes:['email','roleId','password'],
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
module.exports = {
  handleLogin: handleLogin,
  getAllUsers:getAllUsers
};
