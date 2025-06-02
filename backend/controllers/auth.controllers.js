// import prisma from "../config/prismaClient.js";
import bcrypt from "bcrypt";
import { authConstraints } from "../helpers/constraints.js";
// import validate from 'validate';


const authController = {
    register: async (req, res) => {
        try {
            const {name,email,password} = req.body;
            console.log(req.body);
            // validate(req.body, authConstraints);
            console.log("after");
            return res.json(req.body);
        }
        catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }
    },
}

export default authController;