const mongoose = require("mongoose")
const User = require("../model/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const register = async(req,res)=>{
    let user = new User ({
        name: req.body.name,
        email:req.body.email,
        password: bcrypt.hashSync(req.body.password),
        admin:req.body.admin
    })
  const userSelect = await User.findOne({email:req.body.email})

  if(userSelect){
    return res.status(401).json({
      error:true,
      message:"usuário já cadastrado no Banco!"
    })
  }
    try {
        const savedUser = await user.save()
        res.json({
          error:false,
          message:savedUser
        })
    } catch (error) {
        res.status(500).json({
          error:true,
          message:"Erro ao registrar usuário"
        })
        console.log(error)
    }
}

const login = async(req,res)=>{
  const userSelect = await User.findOne({email:req.body.email})

  if(!userSelect){
   return res.status(404).json({
      error:true,
      message:"Usuário ou senha incorretos!"
    })
  }
  try {
    const passwordMatch = bcrypt.compareSync(req.body.password,userSelect.password)
    if(!passwordMatch){
    return  res.status(500).json({
        error:true,
        message:"email ou senha incorretos!"
      })
    }

    const token = jwt.sign({id:userSelect._id,admin:userSelect.admin},process.env.SECRET_TOKEN)
    res.header("token",token)
    
    res.status(200).json({
      error:false,
      message:"Usuário logado!",
      admin: userSelect.admin
    })
  } catch (error) {
    res.send(error)
        console.log("Erro ao logar usuário")
  }
}

const deleteUser = async (req,res)=>{
  
  let user = await User.findOne({email:req.body.email})
  try {
    if(req.user.admin){
    let usuario = await User.findByIdAndDelete(user._id)
    res.status(200).json({
      error:false,
      message:"Usuário Deletado"
    })
  }
  }
   catch (error) {
    res.status(500).json({
      error:true,
      message:"Erro ao deletar Usuário"
    })
  }
  
  
}

const updateUser = async (req,res)=>{
  const userSelect = await User.findOne({email:req.body.email})
  const user ={}
  user.name = req.body.name
  user.email = req.body.email
  user.password = bcrypt.hashSync(req.body.password)
  user.admin = req.body.admin
  user.novoEmail = req.body.novoEmail
  if(!userSelect){
     res.status(404).json({
      error:true,
      message:"Usuário não encontrado"
    })
  }

  try {
    user.email = user.novoEmail
    const userUpdate = await User.findByIdAndUpdate({_id:userSelect._id},user)
    res.status(200).json({
      error:false,
      message:"Usuário atualizado com sucesso!"
    })
  } catch (error) {
    res.status(500).json({
      error:true,
      message:"Erro ao atualizar Usuário"
    })
  }

}

module.exports = {register,login,deleteUser,updateUser}