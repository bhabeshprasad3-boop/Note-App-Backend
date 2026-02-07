const z = require('zod');

const registerSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(20, { message: "Username must not exceed 20 characters" })
    .regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }),

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

module.exports = registerSchema;