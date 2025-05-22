import { z } from "zod";

// Define the Zod schema for student data
export const studentSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  dateOfBirth: z.coerce.date({ required_error: "Date of birth is required" }),
  fathersName: z.string().trim().min(1, "Father's name is required"),
  mothersName: z.string().trim().optional(),
  guardiansName: z.string().trim().optional(),
  maritalStatus: z.enum(["Married", "unmarried"], {
    required_error: "Marital status is required",
  }),
  courseName: z.string().min(1, "Course name is required"),
  registrationNo: z.string().trim().min(1, "Registration number is required"),
  registrationYear: z.coerce.number({
    required_error: "Registration year is required",
  }),
  addmissionDate: z.coerce.date({
    required_error: "Admission date is required",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().trim().min(1, "Phone number is required"),
  address: z.string().trim().min(1, "Address is required"),
  city: z.string().trim().min(1, "City is required"),
  state: z.string().trim().min(1, "State is required"),
  pin: z.string().trim().min(1, "PIN code is required"),
  adhaarNo: z.string().trim().min(1, "Adhaar number is required"),
  photo: z.string().trim().min(1, "Photo URL is required"),
  signature: z.string().trim().min(1, "Signature URL is required"),
  documents: z.string().trim().min(1, "Documents field is required"),
  isCompleted: z.boolean().optional().default(false),
  isActive: z.boolean().optional().default(true),
  year: z.string().optional(),
});
