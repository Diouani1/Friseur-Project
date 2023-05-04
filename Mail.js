import nodemailer from 'nodemailer';
import dotenv from "dotenv"


dotenv.config()




const {MAILUSER, MAILPASS} = process.env;

const sending = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: MAILUSER,
        pass: MAILPASS
    }
})


export const sendEmail = (sendTo, subject, text) => {
   
    return new Promise((resolve, reject) => {
        sending.sendMail({
            from: MAILUSER,
            to: sendTo,
            subject: subject,
            html: text
        }, (err, info) =>{
            if(err){
                reject(err)
            }else{
                resolve(info)
            }
        })
    })
}

export default sendEmail;