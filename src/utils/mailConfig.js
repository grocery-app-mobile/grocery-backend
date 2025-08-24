import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',      
  port: 465,                  
  secure: true,               
  auth: {
    user: "mypayaps@gmail.com",      
    pass: "fprnpwauxpmxwzzt"   
  }
});

export default transporter;
