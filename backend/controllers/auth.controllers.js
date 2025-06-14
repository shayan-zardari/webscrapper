import bcrypt from "bcrypt";
import random from "random";
import prisma from "../config/prismaClient.js";
import signupEmail from "../mails/signup.mail.js";
import jwt from "jsonwebtoken";
import { z } from "zod";
import userValidationSchema from "../helpers/userValidationSchema.js";

const authController = {
  register: async (req, res) => {
    try {
      userValidationSchema.parse(req.body);

      const hashedPassword = await bcrypt.hash(req.body.password, 10); // process.env.SALTROUNDS

      const user = await prisma.user.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        },
      });

      const authToken = await jwt.sign(
            {
              id: user.id,
              email: user.email
            },
            process.env.SECRET, 
            {
              algorithm: "HS256"
            });
          // send that jwt token in response
          
      const verificationCode = random.int(100000, 999999);

      await prisma.verificationCode.create({
        data: {
          code: verificationCode.toString(),
          expires_at: new Date(
            new Date().setMinutes(new Date().getMinutes() + 30)
          ),
          userId: user.id,
        },
      });

      await signupEmail(user, verificationCode);

      return res.status(200).json({
            "token" : authToken,
            "user": user
          });
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Validation failed",
          details: error.errors,
        });
      }
      return res.status(500).json({
        error: error.message,
      });
    }
  },

  verify: async (req, res) => {
    try {
      const email = req.body.email;
      const verificationCode = req.body.verification_code;

      const user = await prisma.user.findFirstOrThrow({
        where: { email: email },
        include: { verification_code: true },
      });

      if (verificationCode !== user.verification_code.code || user.verification_code.expires_at < new Date()) {
        throw new Error("invalid or expired verification code");
      }

      const updated_user = await prisma.user.update({
        where: { email: user.email},
        data: {
          profile_verified: true
        }
      });

      return res.status(200).json({
        "message": `Sucessfully verfied for ${user.email}`,
        user: updated_user
      });

    } catch (error) {

      return res.status(500).json({
        error: error.message
      });

    };

  },

  resendVerificationEmail: async (req, res) => {
    try {
      const user = await prisma.user.findFirstOrThrow({
        where: { email: req.body.email },
        select: {
          email: true,
          profile_verified: true,
          id: true
        }
      });
      
      if (user.profile_verified) {
        throw new Error("profile already verified");
      }

      const verificationCode = random.int(100000, 999999);

      await prisma.verificationCode.update({
        where: {userId: user.id},
        data: {
          code: verificationCode.toString(),
          expires_at: new Date(
            new Date().setMinutes(new Date().getMinutes() + 30)
          ),
          userId: user.id,
        },
      });

      await signupEmail(user, verificationCode);

      return res.json({
        message: "Succuessfully sent Verification Email"
      });

    } catch (error) {
      
      return res.status(500).json({
        error: error.message,
      });

    };

  },

  login: async (req, res) => {
    console.log(req.body);
    // store email and password (from request's body) into constants
    const email = req.body.email;
    const password = req.body.password;

    // find user record where the email from request is eqaul to the email stored in that record
    const loginUser = await prisma.user.findFirst({
    
      where: {
        email: email,
      }

    });

    try {
      // if no user found in the db, throw new error
      if (!loginUser) {
        throw new CustomError({
          code: "404",
          message: "Invalid email or password."
        });
      };

      // if the password entered is correct
      if (await bcrypt.compare(password, loginUser.password)) {
        // if the profile is not verified, throw new error
       
          // make a jwt token with the payload email and user id
          const authToken = await jwt.sign(
            {
              id: loginUser.id,
              email:  loginUser.email
            },
            process.env.SECRET, 
            {
              algorithm: "HS256"
            });
          // send that jwt token in response
          return res.status(200).json({
            "token" : authToken,
            "user": loginUser
          });

      } else {
        // if incorrect password throw new error
        throw new Error("Invalid email or password.");
      };

    } catch (error) {
        return res.status(500).json({
          "error": "User not verified, or wrong nm/email or password."
        });
    };

  },
};

export default authController;