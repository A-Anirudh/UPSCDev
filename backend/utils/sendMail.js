import nodemailer from 'nodemailer'

const sendEmail = async(email,subject,html) =>{
    let transporter = nodemailer.createTransport({
        host:process.env.HOST,
        service:process.env.SERVICE,
        port:Number(process.env.EMAIL_PORT),
        secure:Boolean(process.env.SECURE),
        auth:{
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });
    
    await transporter.sendMail({
        from:process.env.EMAIL,
        to:email,
        subject,
        html
    })

}

export default sendEmail;