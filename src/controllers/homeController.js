import {
    response
} from "express"
import db from "../models/index"
import CRUDservice from "../services/CRUDservice"
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll()
        console.log(data)
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
}
let getAbout = (req, res) => {
    return res.render('admin/about.ejs')
}
let getCRU = (req, res) => {
    return res.render('admin/postCRU.ejs')
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body)
    console.log(message)
    return res.send("post crud from server success")
}
let readCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser()
    return res.render("admin/showCRUD.ejs", {
        dataTable: data
    })
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let user = await CRUDservice.getUserById(userId)

        return res.render("admin/editCRUD.ejs", {
            userData: user
        })
    } else {
        return res.send("user not found")
    }

}
let getPutCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDservice.updateUser(data)
    return res.render('admin/showCRUD.ejs', {
        dataTable: allUser
    })
}
let deleteCRUD = async (req, res) => {
    let id = req.query.id
    let allUser = await CRUDservice.deleteUserById(id)
    return res.render('admin/showCRUD.ejs', {
        dataTable: allUser
    })
}
module.exports = {
    getHomePage: getHomePage,
    getAbout: getAbout,
    getCRU: getCRU,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
    getEditCRUD: getEditCRUD,
    getPutCRUD: getPutCRUD,
    deleteCRUD: deleteCRUD

}