const express=require('express')
const router=express.Router()
const passwordController=require('../controllers/password')

router.post('/forgotpassword',passwordController.forgotPassword)

router.get('/resetpassword/:id',passwordController.resetpassword)

router.get('/updatepassword/:id',passwordController.updatepasword)

module.exports=router