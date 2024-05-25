const express=require('express')
const router=express.Router();
const userController=require('../controllers/user');
const authcontroller=require('../middleware/auth');
const expenseController=require('../controllers/expense')

// const expenseController=require('../controllers/expense')

router.post('/signup',userController.signUp)

// router.get('/expense',expenseController.GetExpensePage)

router.get('/download',authcontroller.authenticate,expenseController.downloadexpense)

router.get('/getallfiles',authcontroller.authenticate,expenseController.GetAllFiles)

router.post('/login',userController.login)

module.exports=router;