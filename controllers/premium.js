const { Sequelize } = require('sequelize')
const Expense = require('../models/expense')
const User=require('../models/user')

exports.getleaderboard = async (req, res) => {
    try {
        const leaderboardofusers=await User.findAll({
            attributes:['id','name',[Sequelize.fn('sum',Sequelize.col('expenses.amount')),'total_cost']],
            include:[{
                model:Expense,
                attributes:[]
            }]
            ,group:['id'],
            order:[['total_cost','DESC']]
        })
        res.status(200).json(leaderboardofusers)
        // const expenses = await Expense.findAll({
        //     attributes:['userId',[Sequelize.fn('sum',Sequelize.col('expenses.amount')),'total_cost']],group:['userId']
        // })
        // console.log(expenses[0].dataValues);
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
    
    // res.json(expenses)
    // const mp = new Map()
    // for (let i = 0; i < expenses.length; i++) {
    //     let expense = expenses[i].dataValues
    //     console.log(expense)
    //     if (mp.has(expense.userId)) {
    //         mp.set(expense.userId, mp.get(expense.userId) + expense.amount)
    //     } else {
    //         mp.set(expense.userId, expense.amount)
    //     }
    // }
    // const arr=mp.keys()
    // console.log(arr[0])
    // const key_arr = []
    // const value_arr = []
    // for (const x of mp.keys()) {
    //     key_arr.push(x)
    // }
    // console.log(key_arr)
    // for (const y of mp.values()) {
    //     value_arr.push(y)
    // }
    // console.log(value_arr)
    // const user_arr=[]
    // let i=0;
    // while(i<key_arr.length){
    //     const user=await User.findOne({where:{id:key_arr[i]},attributes:['id','name','email']})
    //     // console.log(user.dataValues)
    //     const current_user=user.dataValues
    //     current_user.total_expense=value_arr[i]
    //     // console.log(current_user)
    //     user_arr.push(current_user)
    //     i++
    // }
    
    // for(let i=0;i<user_arr.length-1;i++){
    //     for(let j=0;j<user_arr.length-i-1;j++){
    //         if(user_arr[j].total_expense<user_arr[j+1].total_expense){
    //             let temp=user_arr[j]
    //             user_arr[j]=user_arr[j+1]
    //             user_arr[j+1]=temp
    //         }
    //     }
    // }
    // console.log(user_arr)
    // res.json(user_arr)
}