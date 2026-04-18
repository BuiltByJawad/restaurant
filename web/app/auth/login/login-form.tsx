"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { loginSchema, type LoginFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { FormField, Input } from "@/components/ui/form-field";

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    toast.success("Welcome back! Redirecting...");
    router.push("/dashboard");
  };

  return (
    <div className="space-y-8">
      <div className="text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 lg:hidden">
          <div className="w-8 h-8 bg-[#0A7A5A] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">F</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">FoodFlow</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-900">Welcome back</h2>
        <p className="text-slate-500 mt-2">Enter your credentials to access your dashboard</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          label="Email Address"
          error={errors.email?.message}
        >
          <Input
            {...register("email")}
            type="email"
            placeholder="name@restaurant.com"
            error={!!errors.email}
            disabled={isLoading}
          />
        </FormField>

        <FormField
          label="Password"
          error={errors.password?.message}
        >
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              error={!!errors.password}
              disabled={isLoading}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </FormField>

        <div className="flex items-center justify-end">
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-[#0A7A5A] hover:underline"
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isLoading}
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            href="/auth/register"
            className="font-semibold text-[#0A7A5A] hover:underline"
          >
            Start free trial
          </Link>
        </p>
      </form>
    </div>
  );
}
