import { Metadata } from "next";
import Link from "next/link";
import RegisterFlow from "./register-flow";

export const metadata: Metadata = {
  title: "Start Free Trial | FoodFlow",
  description: "Create your restaurant account and start your 14-day free trial with FoodFlow.",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#0A7A5A] rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-2xl">F</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">FoodFlow</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create your restaurant account</h1>
          <p className="text-slate-500 mt-1">Start your 14-day free trial. No credit card required.</p>
        </div>

        <RegisterFlow />
        
        <p className="text-center text-sm text-slate-500 mt-8">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-semibold text-[#0A7A5A] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
