const jwt = require("jsonwebtoken")


const auth = async(req,res,next)=>{

    let token = req.header("token")
    if(!token){
      res.status(401).json({
        error:true,
        message:"Token Negado!"
      })
    }
    try {
      const verify = jwt.verify(token,process.env.SECRET_TOKEN)
      req.user = verify
      next()
    } catch (error) {
      res.json({
        error:true,
        message:error
      })
    }
    
  }

  module.exports = {auth}