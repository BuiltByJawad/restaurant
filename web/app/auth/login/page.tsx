import { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Log in | FoodFlow",
  description: "Log in to your FoodFlow restaurant dashboard",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side: Branding & Benefits (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#0A7A5A] to-[#0f6048] p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <span className="text-[#0A7A5A] font-bold text-2xl">F</span>
            </div>
            <span className="text-2xl font-bold tracking-tight">FoodFlow</span>
          </div>
          
          <div className="max-w-md">
            <h1 className="text-4xl font-bold mb-6 leading-tight">
              Manage your restaurant like a pro.
            </h1>
            <p className="text-emerald-100 text-lg mb-10">
              Join 500+ restaurants in Bangladesh growing their business with FoodFlow.
            </p>
            
            <ul className="space-y-6">
              {[
                "Instant online storefront for your restaurant",
                "Integrated payments via SSLCommerz & bKash",
                "Real-time order tracking & analytics"
              ].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 bg-white/20 rounded-full p-1">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-emerald-50 text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="relative z-10">
          <p className="text-emerald-200 text-sm">
            © {new Date().getFullYear()} FoodFlow Technologies Ltd.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Right side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
