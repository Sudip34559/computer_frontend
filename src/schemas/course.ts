import { z } from "zod";

export const courseCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
});

export const courseSchema = z.object({
  name: z.string().trim().min(1, "Course name is required"),
  image: z.string().trim().min(1, "Course image file is required"), // not a URL
  description: z.string().min(1, "Course description is required"),
  category: z.string().min(1, "Category is required"), // ObjectId as string
  price: z.coerce.number({ required_error: "Price is required" }),
  branchprice: z.coerce.number({ required_error: "Branch price is required" }),
  duration: z.coerce.number({ required_error: "Duration is required" }), // assumed to be in months/days/etc.
});

export const coursePaperSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  coursename: z.string().min(1, "Course  is required"), // ObjectId as string
  paperno: z.string().trim().min(1, "Paper number is required"),
  theorymarks: z.coerce.number().min(0, "Theory marks must be a number"),
  practicalmarks: z.coerce.number().min(0, "Practical marks must be a number"),
});
