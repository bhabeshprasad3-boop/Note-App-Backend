const z = require('zod');

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email address is too long" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(20, { message: "Password must not exceed 20 characters" })
});

module.exports = loginSchema;