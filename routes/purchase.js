const express=require('express');

const router=express.Router()

const authenticatemiddleware=require('../middleware/auth')
const purchaseController=require('../controllers/purchase')

router.get('/premiummembership',authenticatemiddleware.authenticate,purchaseController.purchasepremium)

router.post('/updatetransactionstatus',authenticatemiddleware.authenticate,purchaseController.updateTransactionStatus)

module.exports=router