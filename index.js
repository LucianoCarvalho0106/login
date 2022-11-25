const express = require("express")
const app = express();
const mongoose = require("mongoose")
const path = require("path")
require("dotenv").config()
const loginRoutes = require("./routes/loginRoutes")
const conectarDB = require("./model/dbConection")


conectarDB.conectarBanco()


app.use("/user",express.json(),loginRoutes)

app.listen(process.env.PORT,()=>console.log(`Servidor rodando na porta ${process.env.PORT}`))