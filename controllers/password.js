const ForgotPassword = require('../models/forgotpasswordrequests')
const User = require('../models/user')
// import { v4 as uuidv4 } from 'uuid';
const uuidv4 = require('uuid').v4
const bcrypt=require('bcryptjs')
const nodemailer = require('nodemailer');


exports.forgotPassword = async (req, res) => {
    const useremail = req.body.email
    const user = await User.findOne({ email: useremail })
    const forgotpassword = await ForgotPassword.create({ id: uuidv4(), userId: user.id, isactive: true })

    var Sib = require('sib-api-v3-sdk');
    var Client = Sib.ApiClient.instance;
    // # Instantiate the client\
    var apiKey = Client.authentications['api-key'];
    apiKey.apiKey = process.env.SIB_API_KEY;

    const transEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
        email: process.env.SIB_SENDER
    }

    const receivers = [
        {
            email: useremail
        },
    ]

    // transEmailApi.sendTransacEmail({
    //     sender,
    //     to: receivers,
    //     subject: 'Your reset password',
    //     htmlContent: `your reset password has been sent to you <a href="http://3.109.32.194:3000/password/resetpassword/${forgotpassword.id}">Reset Password</a> `
    // })
    //     .then(console.log)
    //     .catch(console.log)


        // Create a transporter object using SMTP transport
        const link = `http://localhost:3001/resetpassword/${forgotpassword.id}`;
        console.log(link)        

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jadonkuldeepsingh2@gmail.com',
        pass: 'Kuldeepjadon@18'
    }
});



// Define email content
let mailOptions = {
    from: 'jadonkuldeepsingh2@gmail.com',
    to: useremail,
    subject: 'Forgot Password Mail',
    text: link
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error occurred:', error);
    } else {
        console.log('Email sent:', info.response);
    }
});


}

exports.resetpassword = async (req, res) => {
    const id = req.params.id
    const forgotRequest = await ForgotPassword.findOne({where:{ id: id }})
    if (forgotRequest) {
        if (forgotRequest.isactive == true) {
            forgotRequest.update({isactive:false}).then(()=>{console.log("suceesfull active")}).catch((err)=>{console.log(err)})
            res.status(200).send(`
    <html>
        <script>
                                        
        </script>
        <form action="/password/updatepassword/${id}" method="get">
        <label for="newpassword">Enter New password</label>
        <input name="newpassword" type="password" required></input>
        <button>reset password</button>
        </form>
        </html>
    `)
    res.end()
        }
    }

}

exports.updatepasword = async (req, res) => {
    const id = req.params.id
    const new_password=req.query.newpassword
    const forgotrequest=await ForgotPassword.findOne({id:id})
    const userId=forgotrequest.userId
    const user=await User.findOne({id:userId})
    if(user){
        bcrypt.hash(new_password,10,(error,result)=>{
            if(error){
                console.log(error)
            }else{
                user.update({password:result})
                .then(()=>{
                    res.status(200).json({message:'Successfully updated new user'})
                })
                .catch((error)=>{
                    console.log(error)
                })
            }
        })
    }else{
        res.status(404).json({ error: 'No user Exists', success: false})
    }
    
}