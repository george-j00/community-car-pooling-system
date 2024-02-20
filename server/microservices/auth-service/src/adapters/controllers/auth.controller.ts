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

    //   await this.authUsecase.register(payload);
      await sendEmail(email, generatedOtp);

      //   res.status(200).send('Address added successfully');
    } catch (error) {
      res.status(500).send("Error while adding address");
      console.log("Error while adding => ", error);
    }
  }
}
