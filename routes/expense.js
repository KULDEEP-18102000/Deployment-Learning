const express=require('express')
const router=express.Router()
const userAuthenticate=require('../middleware/auth')

const expenseController=require('../controllers/expense')

// router.get('/',expenseController.GetExpensePage)

router.post('/get-expenses',userAuthenticate.authenticate,expenseController.getExpenses)

router.post('/add-expense',userAuthenticate.authenticate,expenseController.AddExpense)

router.delete('/delete-expense/:id',userAuthenticate.authenticate,expenseController.deleteExpense)

router.put('/update-expense/:id',userAuthenticate.authenticate,expenseController.editExpense)

module.exports=router