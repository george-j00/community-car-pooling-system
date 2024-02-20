import nodemailer from "nodemailer"

export const sendEmail = async (email: string ,otp:number) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'gj816373@gmail.com',
          pass: 'oykvaqiekefunsfp',
        },
      });
      console.log(otp,'OTP');
      
      const mailOptions = {
        from: 'gj816373@gmail.com',
        // to: 'subingeorge027@gmail.com', // Replace with the user's email address
        to: email, 
        subject: 'OTP Verification',
        text: `Your OTP for verification is: ${otp}`,
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent successfully:', info.response);
        }
      });
}