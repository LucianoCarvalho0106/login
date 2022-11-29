const authController = require("../controllers/authController")
const express = require("express")
const router = express.Router()
const loginController = require("../controllers/loginController")

router.get("/",authController.auth,(req,res)=>{
    if(req.user.admin){
        res.status(200).json({
            error:false,
            message:"esta pagina só pode ser vista por administradores"
        })
        }
        res.status(400).json({
            error:true,
            message:"Acesso negado!"
        })
    }
)

router.delete("/",authController.auth,loginController.deleteUser)
router.put("/",authController.auth,loginController.updateUser)


module.exports = router


