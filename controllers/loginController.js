const mongoose = require("mongoose")
const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    let user = new User ({
        name: req.body.name,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password)
    })
  const userSelect = await User.findOne({email:req.body.email})

  if(userSelect){
    return res.status(401).send("usuário já cadastrado no Banco!")
  }
    try {
        const savedUser = await user.save()
        res.send(savedUser)
    } catch (error) {
        res.send(error)
        console.log("Erro ao registrar usuário")
    }
}

const login = async(req,res)=>{
  const userSelect = await User.findOne({email:req.body.email})

  if(!userSelect){
    res.status(404).send("Usuário ou senha incorretos!")
  }
  try {
    const passwordMatch = bcrypt.compareSync(req.body.password,userSelect.password)
    if(!passwordMatch){
      res.status(404).send("email ou senha incorretos!")
    }

    const token = jwt.sign({id:userSelect._id},process.env.SECRET_TOKEN)
    res.header("token-value",token)
    res.send("Usuário logado!")
  } catch (error) {
    res.send(error)
        console.log("Erro ao logar usuário")
  }
}


module.exports = {register,login}