import {z} from "zod";

const userValidationSchema = z.object({
  name: z.string().min(2).max(30),
  email: z.string().email(),
  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]+$/
    ),
});