const mongoose = require("mongoose")

async function conectarBanco (){
    try {
        let conect = await mongoose.connect(process.env.STRING_CONNECTION_DB,{useNewUrlParser:true,useUnifiedTopology:true})
        console.log("Conectado ao Banco!")
    } catch (error) {
        console.log("Houve um erro ao se conectar!", error)
    }
    
}

module.exports = {conectarBanco}