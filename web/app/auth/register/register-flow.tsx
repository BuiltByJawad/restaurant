"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronLeft, ChevronRight, Loader2, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { registerSchema, type RegisterFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { FormField, Input, SelectField } from "@/components/ui/form-field";
import { PRICING_PLANS } from "@/lib/dummy-data";
import { cn, formatCurrency } from "@/lib/utils";

const CITIES = [
  "Dhaka",
  "Chittagong",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Barishal",
  "Mymensingh",
  "Cox's Bazar",
];

export default function RegisterFlow() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      restaurantName: "",
      ownerName: "",
      city: "",
      area: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      plan: "pro",
      agreeTerms: false,
    },
    mode: "onBlur",
  });

  const watchPassword = watch("password");
  const watchPlan = watch("plan");

  const passwordStrength = useMemo(() => {
    if (!watchPassword) return 0;
    let strength = 0;
    if (watchPassword.length >= 8) strength += 25;
    if (/[A-Z]/.test(watchPassword)) strength += 25;
    if (/[0-9]/.test(watchPassword)) strength += 25;
    if (/[^A-Za-z0-9]/.test(watchPassword)) strength += 25;
    return strength;
  }, [watchPassword]);

  const strengthColor = (strength: number) => {
    if (strength <= 25) return "bg-red-500";
    if (strength <= 50) return "bg-amber-500";
    if (strength <= 75) return "bg-blue-500";
    return "bg-emerald-500";
  };

  const strengthText = (strength: number) => {
    if (strength === 0) return "";
    if (strength <= 25) return "Weak";
    if (strength <= 50) return "Fair";
    if (strength <= 75) return "Strong";
    return "Very Strong";
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof RegisterFormData)[] = [];
    if (step === 1) {
      fieldsToValidate = ["restaurantName", "ownerName", "city", "area"];
    } else if (step === 2) {
      fieldsToValidate = ["email", "phone", "password", "confirmPassword"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    toast.success("🎉 Account created! Setting up your restaurant...");
    router.push("/dashboard");
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-slate-50 border-bottom border-slate-100 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-2 relative z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300",
                  step === s
                    ? "bg-[#0A7A5A] text-white ring-4 ring-emerald-100"
                    : step > s
                    ? "bg-[#0A7A5A] text-white"
                    : "bg-slate-200 text-slate-500"
                )}
              >
                {step > s ? <Check size={20} /> : s}
              </div>
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-wider",
                  step >= s ? "text-[#0A7A5A]" : "text-slate-400"
                )}
              >
                Step {s}
              </span>
            </div>
          ))}
          {/* Connecting Lines */}
          <div className="absolute top-[4.5rem] left-[25%] right-[25%] h-0.5 bg-slate-200 -z-0">
            <div
              className="h-full bg-[#0A7A5A] transition-all duration-500"
              style={{ width: `${(step - 1) * 50}%` }}
            />
          </div>
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold text-slate-800">
            {step === 1 && "Restaurant Information"}
            {step === 2 && "Account Details"}
            {step === 3 && "Select Your Plan"}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <FormField label="Restaurant Name" error={errors.restaurantName?.message}>
              <Input
                {...register("restaurantName")}
                placeholder="e.g. Dhaka Biryani House"
                error={!!errors.restaurantName}
              />
            </FormField>

            <FormField label="Owner Full Name" error={errors.ownerName?.message}>
              <Input
                {...register("ownerName")}
                placeholder="e.g. Mohammad Rahim"
                error={!!errors.ownerName}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Business City" error={errors.city?.message}>
                <SelectField
                  {...register("city")}
                  placeholder="Select City"
                  error={!!errors.city}
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </SelectField>
              </FormField>

              <FormField label="Area/Thana" error={errors.area?.message}>
                <Input
                  {...register("area")}
                  placeholder="e.g. Dhanmondi"
                  error={!!errors.area}
                />
              </FormField>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <FormField label="Email Address" error={errors.email?.message}>
              <Input
                {...register("email")}
                type="email"
                placeholder="name@example.com"
                error={!!errors.email}
              />
            </FormField>

            <FormField
              label="Phone Number"
              error={errors.phone?.message}
              hint="Format: 01XXXXXXXXX"
            >
              <Input
                {...register("phone")}
                placeholder="01712345678"
                error={!!errors.phone}
              />
            </FormField>

            <FormField label="Password" error={errors.password?.message}>
              <Input
                {...register("password")}
                type="password"
                placeholder="••••••••"
                error={!!errors.password}
              />
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-500">Security:</span>
                  <span className={cn(
                    passwordStrength > 0 ? strengthColor(passwordStrength).replace("bg-", "text-") : "text-slate-400"
                  )}>
                    {strengthText(passwordStrength)}
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={cn("h-full transition-all duration-500", strengthColor(passwordStrength))}
                    style={{ width: `${passwordStrength}%` }}
                  />
                </div>
              </div>
            </FormField>

            <FormField label="Confirm Password" error={errors.confirmPassword?.message}>
              <Input
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••••"
                error={!!errors.confirmPassword}
              />
            </FormField>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setValue("plan", plan.id as any)}
                  className={cn(
                    "relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col h-full",
                    watchPlan === plan.id
                      ? "border-[#0A7A5A] bg-emerald-50/30 ring-4 ring-emerald-50"
                      : "border-slate-100 hover:border-slate-200 bg-white"
                  )}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#F59E0B] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider flex items-center gap-1">
                      <Star size={10} fill="currentColor" />
                      Recommended
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <h3 className="font-bold text-slate-900">{plan.name}</h3>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-xl font-bold text-[#0A7A5A]">
                        {plan.price === 0 ? "Custom" : formatCurrency(plan.price)}
                      </span>
                      {plan.price > 0 && <span className="text-xs text-slate-500">/mo</span>}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {plan.features.slice(0, 4).map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check size={14} className="text-[#0A7A5A] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={cn(
                    "mt-auto w-6 h-6 rounded-full border-2 flex items-center justify-center self-center",
                    watchPlan === plan.id
                      ? "bg-[#0A7A5A] border-[#0A7A5A] text-white"
                      : "border-slate-200 text-transparent"
                  )}>
                    <Check size={14} strokeWidth={3} />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-1">
                  <input
                    type="checkbox"
                    className="sr-only"
                    {...register("agreeTerms")}
                  />
                  <div className={cn(
                    "w-5 h-5 rounded border-2 transition-all duration-150 flex items-center justify-center",
                    watch("agreeTerms")
                      ? "bg-[#0A7A5A] border-[#0A7A5A] text-white"
                      : "border-slate-300 group-hover:border-slate-400 bg-white",
                    errors.agreeTerms && "border-red-500 bg-red-50"
                  )}>
                    {watch("agreeTerms") && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>
                <span className="text-sm text-slate-600 leading-tight">
                  I agree to the <Link href="/terms" className="text-[#0A7A5A] font-medium hover:underline">Terms & Conditions</Link> and <Link href="/privacy" className="text-[#0A7A5A] font-medium hover:underline">Privacy Policy</Link>.
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="flex items-center gap-1 text-sm text-red-500 mt-1" role="alert">
                  <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {errors.agreeTerms.message}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="w-full sm:w-auto px-8"
              disabled={isLoading}
            >
              <ChevronLeft size={18} className="mr-1" />
              Back
            </Button>
          )}
          
          {step < 3 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="w-full sm:flex-1"
              size="lg"
            >
              Next Step
              <ChevronRight size={18} className="ml-1" />
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full sm:flex-1"
              size="lg"
              loading={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account & Start Trial"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

import Link from "next/link";
