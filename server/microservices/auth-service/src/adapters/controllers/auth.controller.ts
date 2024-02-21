import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import otpGenerator from "otp-generator";
import { AuthUsecase } from "../../usecases/auth.usecase";
import { sendEmail } from "../../frameworks/nodemailer/nodemailer";

export class AuthController {
  constructor(private authUsecase: AuthUsecase) {}

  async register_user(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const generatedOtp = +otpGenerator.generate(4, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
        digits: true,
      });

      const payload = {
        username,
        email,
        password: hashedPassword,
        otp: generatedOtp,
      };

      await sendEmail(email, generatedOtp);
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
    await this.authUsecase.validateOtp(email,otp);
    res.status(200).send('otp validated successfully');
   } catch (error) {
    res.status(401).send('otp validation failed');
   }
  }

  login_user = async (req: Request, res: Response) => {
    try {
      const {email ,password} = req.body;

      const saltRounds = 10;
      const loginResponse = await this.authUsecase.login(email, password);

    if (loginResponse !== null) {
      res.status(200).json({ token: loginResponse });
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
