import { z } from "zod";


const employeeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits long"),
  designation: z.enum(["hr", "manager", "sales"], "Invalid designation"),
  gender: z.enum(["male", "female"], "Invalid gender"),
  course: z.enum(["mca", "bca", "bsc"], "Invalid course")
});

export { employeeSchema };