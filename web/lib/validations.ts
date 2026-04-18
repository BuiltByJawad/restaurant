import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please enter a valid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    restaurantName: z
      .string()
      .min(1, "Restaurant name is required")
      .min(3, "Restaurant name must be at least 3 characters")
      .max(80, "Restaurant name is too long"),
    ownerName: z
      .string()
      .min(1, "Your full name is required")
      .min(3, "Name must be at least 3 characters"),
    email: z
      .string()
      .min(1, "Email address is required")
      .email("Please enter a valid email address"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number (e.g. 01712345678)"),
    city: z.string().min(1, "City is required"),
    area: z.string().min(1, "Area is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[0-9]/, "Must contain at least one number"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    plan: z.enum(["starter", "pro", "enterprise"]),
    agreeTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the Terms & Conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Name must be at least 3 characters"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^01[3-9]\d{8}$/, "Enter a valid Bangladeshi phone number"),
  address: z
    .string()
    .min(1, "Delivery address is required")
    .min(10, "Please provide a complete address"),
  area: z.string().min(1, "Please select your area"),
  city: z.string().min(1, "City is required"),
  note: z.string().optional(),
  paymentMethod: z.enum(["sslcommerz", "cod"]),
  deliveryType: z.enum(["asap", "scheduled"]),
  scheduledTime: z.string().optional(),
});

export const menuItemSchema = z.object({
  name: z
    .string()
    .min(1, "Item name is required")
    .max(100, "Name is too long"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(300, "Description is too long"),
  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(1, "Price must be at least ৳1")
    .max(99999, "Price seems too high"),
  categoryId: z.string().min(1, "Please select a category"),
  isAvailable: z.boolean(),
  isBestseller: z.boolean(),
  isVeg: z.boolean(),
  spiceLevel: z.enum(["none", "mild", "medium", "hot"]),
  preparationTime: z
    .number({ invalid_type_error: "Must be a number" })
    .min(1, "At least 1 minute")
    .max(120, "Preparation time seems too long"),
});

export const restaurantSettingsSchema = z.object({
  name: z.string().min(3, "Restaurant name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  phone: z.string().regex(/^01[3-9]\d{8}$/, "Enter a valid phone number"),
  address: z.string().min(5, "Please enter complete address"),
  area: z.string().min(1, "Area is required"),
  city: z.string().min(1, "City is required"),
  minimumOrder: z.number().min(0, "Cannot be negative"),
  deliveryFee: z.number().min(0, "Cannot be negative"),
  estimatedDeliveryMin: z.number().min(5, "Minimum 5 minutes"),
  estimatedDeliveryMax: z.number().min(10, "Minimum 10 minutes"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type CheckoutFormData = z.infer<typeof checkoutSchema>;
export type MenuItemFormData = z.infer<typeof menuItemSchema>;
export type RestaurantSettingsFormData = z.infer<typeof restaurantSettingsSchema>;
