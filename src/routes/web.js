import express from "express"
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
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

    return app.use("/", router)
}
module.exports = initWebRoutes