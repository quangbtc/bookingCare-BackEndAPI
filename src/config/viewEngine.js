import express from "express"

let configViewEngine = (app) => {
    //Đường dẫn tĩnh đến public
    app.use(express.static("./src/public"))
    // Set view engine ejs
    app.set("view engine", "ejs")
    app.set("views", "./src/views")


}
module.exports = configViewEngine