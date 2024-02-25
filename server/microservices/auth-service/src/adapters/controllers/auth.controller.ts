import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import { AuthUsecase } from "../../domain/usecases/auth.usecase";
import { sendEmail } from "../../frameworks/nodemailer/nodemailer";

export class AuthController {
  constructor(private authUsecase: AuthUsecase) {}

  async otpGenerator():Promise<number> {
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    const generatedOtp = +otp;
    return generatedOtp
  }
  async register_user(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const OTP = await this.otpGenerator()

      const payload = {
        username,
        email,
        password: hashedPassword,
        otp: OTP,
      };
      
      await sendEmail(email, OTP);
      await this.authUsecase.register(payload);
      
      res.status(200).send('otp sent successfully');
    } catch (error) {
      res.status(500).send("Error while sending the otp");
      console.log("Error while adding => ", error);
    }
  }

  async validateOtp(req: Request, res: Response) {
   try {
    const {email,otp} = req.body;
   const userData =  await this.authUsecase.validateOtp(email,otp);
   console.log('userDAta is sent to client ',userData);
    res.status(200).json({user : userData})
    
   } catch (error) {  
    res.status(401).send('otp validation failed');
   }
  }

  async resendOtp(req: Request, res: Response) {
   try {
    const { email } = req.body;

    const otp = await this.otpGenerator()

    console.log('resened',email,otp);
    
    await sendEmail(email, otp);
    await this.authUsecase.resendOtp(email,otp);
   console.log('otp resend succssfull ');
    // res.status(200); 
   } catch (error) {  
    res.status(401).send('otp validation failed');
   }
  }


  login_user = async (req: Request, res: Response) => {
    try {
      const {email ,password} = req.body;

      const token = await this.authUsecase.login(email, password); 
      
    if (token !== null) {

      res.status(200).json({token});
    
    } else { 
      res.status(401).json({ error: "Login failed" });
      console.log("Login failed for user:", email);
    } 
 
    } catch (error) {
      res.status(500).send("Error while adding User");
      console.log("Error while adding => ", error);
    }
  };


}
