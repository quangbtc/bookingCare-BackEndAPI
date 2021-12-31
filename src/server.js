import express from "express"
// Thêm thư viên body-parser
import bodyParser from "body-parser"
import viewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
require('dotenv').config()


let app = express()

//config app
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

viewEngine(app)
initWebRoutes(app)
//Lấy tham số port từ file env
let port = process.env.PORT || 6969

app.listen(port, () => {
    console.log("Backend nodejs is running on the port" + port)
})