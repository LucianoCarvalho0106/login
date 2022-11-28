const express = require("express")
const app = express();
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()
const loginRoutes = require("./routes/loginRoutes")
const adminRoutes = require("./routes/adminRoutes")
const conectarDB = require("./model/dbConection")


conectarDB.conectarBanco()


app.use("/user",express.json(),loginRoutes)
app.use("/admin",express.json(),adminRoutes)

app.listen(process.env.PORT,()=>console.log(`Servidor rodando na porta ${process.env.PORT}`))