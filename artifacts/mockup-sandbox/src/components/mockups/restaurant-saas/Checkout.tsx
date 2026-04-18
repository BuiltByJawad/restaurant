import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  MapPin, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight,
  Info,
  Calendar,
  Lock
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function Checkout() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    area: "",
    instructions: ""
  });
  const [paymentMethod, setPaymentMethod] = useState("sslcommerz");
  const [deliveryTime, setDeliveryTime] = useState("asap");

  const validateField = (name: string, value: string) => {
    let error = "";
    if (!value) {
      if (name !== "instructions") {
        error = "This field is required";
      }
    } else {
      if (name === "phone" && !/^01\d{9}$/.test(value)) {
        error = "Phone must be in 01XXXXXXXXX format";
      }
    }
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    validateField(e.target.name, e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: "" }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, area: value }));
    if (errors.area) {
      setErrors(prev => ({ ...prev, area: "" }));
    }
  };

  const STEPS = ["Cart", "Delivery", "Payment", "Confirm"];
  const CURRENT_STEP = 1; // 0-indexed, so 1 is Delivery

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-[#0A7A5A] selection:text-white pb-20">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-[#0A7A5A] flex items-center justify-center text-white font-bold">
              F
            </div>
            <span className="font-bold text-xl tracking-tight text-gray-900">FoodFlow</span>
          </div>
          <div className="text-sm font-medium text-gray-500">
            Secure Checkout
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 pt-8 pb-12">
        {/* Progress Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gray-200 -z-10"></div>
            {STEPS.map((step, index) => {
              const isActive = index === CURRENT_STEP;
              const isPast = index < CURRENT_STEP;
              return (
                <div key={step} className="flex flex-col items-center gap-2 bg-gray-50 px-2">
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 
                      ${isPast ? 'bg-[#0A7A5A] border-[#0A7A5A] text-white' : 
                        isActive ? 'bg-white border-[#0A7A5A] text-[#0A7A5A]' : 
                        'bg-white border-gray-300 text-gray-400'}`}
                  >
                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : index + 1}
                  </div>
                  <span className={`text-xs font-medium ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Main Flow */}
          <div className="flex-1 space-y-6">
            
            {/* Delivery Details */}
            <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#0A7A5A]" />
                  Delivery Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-5 bg-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <Label htmlFor="fullName" className="text-gray-700">Full Name</Label>
                    <Input 
                      id="fullName" 
                      name="fullName"
                      placeholder="e.g. Rahim Uddin" 
                      value={formData.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`focus-visible:ring-[#0A7A5A] ${errors.fullName ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                    <Input 
                      id="phone" 
                      name="phone"
                      placeholder="01XXXXXXXXX" 
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`focus-visible:ring-[#0A7A5A] ${errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    />
                    {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="area" className="text-gray-700">Area / Thana</Label>
                  <Select value={formData.area} onValueChange={handleSelectChange}>
                    <SelectTrigger 
                      id="area"
                      onBlur={() => validateField("area", formData.area)}
                      className={`w-full focus:ring-[#0A7A5A] ${errors.area ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <SelectValue placeholder="Select delivery area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gulshan">Gulshan</SelectItem>
                      <SelectItem value="dhanmondi">Dhanmondi</SelectItem>
                      <SelectItem value="mirpur">Mirpur</SelectItem>
                      <SelectItem value="uttara">Uttara</SelectItem>
                      <SelectItem value="banani">Banani</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.area && <p className="text-xs text-red-500 mt-1">{errors.area}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="address" className="text-gray-700">Detailed Address</Label>
                  <Textarea 
                    id="address" 
                    name="address"
                    placeholder="House, Road, Block, Flat Number" 
                    className={`resize-none focus-visible:ring-[#0A7A5A] min-h-[80px] ${errors.address ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                    value={formData.address}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address}</p>}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="instructions" className="text-gray-700 flex justify-between">
                    <span>Special Instructions</span>
                    <span className="text-gray-400 font-normal">Optional</span>
                  </Label>
                  <Input 
                    id="instructions" 
                    name="instructions"
                    placeholder="e.g. Ring the bell, beware of dog" 
                    className="focus-visible:ring-[#0A7A5A]"
                    value={formData.instructions}
                    onChange={handleChange}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Time */}
            <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#0A7A5A]" />
                  Delivery Time
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <RadioGroup value={deliveryTime} onValueChange={setDeliveryTime} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <RadioGroupItem value="asap" id="time-asap" className="peer sr-only" />
                    <Label
                      htmlFor="time-asap"
                      className="flex flex-col items-start gap-1 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 peer-data-[state=checked]:border-[#0A7A5A] peer-data-[state=checked]:bg-[#0A7A5A]/5 cursor-pointer transition-all"
                    >
                      <span className="font-semibold text-gray-900 flex justify-between w-full">
                        <span>ASAP</span>
                        {deliveryTime === "asap" && <CheckCircle2 className="w-5 h-5 text-[#0A7A5A]" />}
                      </span>
                      <span className="text-sm text-gray-500">25-35 minutes</span>
                    </Label>
                  </div>
                  <div className="relative">
                    <RadioGroupItem value="schedule" id="time-schedule" className="peer sr-only" />
                    <Label
                      htmlFor="time-schedule"
                      className="flex flex-col items-start gap-1 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 peer-data-[state=checked]:border-[#0A7A5A] peer-data-[state=checked]:bg-[#0A7A5A]/5 cursor-pointer transition-all"
                    >
                      <span className="font-semibold text-gray-900 flex justify-between w-full">
                        <span>Schedule</span>
                        {deliveryTime === "schedule" && <CheckCircle2 className="w-5 h-5 text-[#0A7A5A]" />}
                      </span>
                      <span className="text-sm text-gray-500">Pick a later time</span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-100 pb-4 flex flex-row items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#0A7A5A]" />
                  Payment Method
                </CardTitle>
                <Badge variant="outline" className="bg-green-50 text-[#0A7A5A] border-green-200 font-medium px-2 py-0.5 flex gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Secured
                </Badge>
              </CardHeader>
              <CardContent className="p-6 bg-white space-y-4">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {/* SSLCommerz */}
                  <div className="relative">
                    <RadioGroupItem value="sslcommerz" id="pay-sslcommerz" className="peer sr-only" />
                    <Label
                      htmlFor="pay-sslcommerz"
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 peer-data-[state=checked]:border-[#0A7A5A] peer-data-[state=checked]:bg-[#0A7A5A]/5 cursor-pointer transition-all overflow-hidden"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                          ${paymentMethod === "sslcommerz" ? 'border-[#0A7A5A]' : 'border-gray-300'}`}>
                          {paymentMethod === "sslcommerz" && <div className="w-2.5 h-2.5 rounded-full bg-[#0A7A5A]" />}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 flex items-center gap-2">
                            SSLCommerz
                            <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-blue-50 text-blue-700 hover:bg-blue-50">Popular</Badge>
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">Visa, Mastercard, bKash, Nagad, Rocket</p>
                        </div>
                      </div>
                      
                      {/* Faux Logos */}
                      <div className="flex gap-1">
                        <div className="w-8 h-5 bg-[#E2136E] rounded flex items-center justify-center"><span className="text-[8px] text-white font-bold">bKash</span></div>
                        <div className="w-8 h-5 bg-[#ED1C24] rounded flex items-center justify-center"><span className="text-[8px] text-white font-bold">Nagad</span></div>
                        <div className="w-8 h-5 bg-[#1434CB] rounded flex items-center justify-center"><span className="text-[8px] text-white font-bold italic">VISA</span></div>
                      </div>
                    </Label>
                    
                    {paymentMethod === "sslcommerz" && (
                      <div className="absolute top-0 right-0 p-4 pointer-events-none">
                         {/* Optional corner indicator if needed, already handled via layout */}
                      </div>
                    )}
                  </div>

                  {/* COD */}
                  <div className="relative">
                    <RadioGroupItem value="cod" id="pay-cod" className="peer sr-only" />
                    <Label
                      htmlFor="pay-cod"
                      className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 peer-data-[state=checked]:border-[#0A7A5A] peer-data-[state=checked]:bg-[#0A7A5A]/5 cursor-pointer transition-all"
                    >
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center
                        ${paymentMethod === "cod" ? 'border-[#0A7A5A]' : 'border-gray-300'}`}>
                        {paymentMethod === "cod" && <div className="w-2.5 h-2.5 rounded-full bg-[#0A7A5A]" />}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">Cash on Delivery</p>
                        <p className="text-xs text-gray-500 mt-0.5">Pay with cash when your order arrives</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-24 space-y-4">
              <Card className="border-gray-200 shadow-sm rounded-xl overflow-hidden">
                <CardHeader className="bg-gray-50 border-b border-gray-100 py-4 px-5">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">Order From</p>
                  <CardTitle className="text-lg">Dhaka Biryani House</CardTitle>
                </CardHeader>
                <CardContent className="p-0 bg-white">
                  <div className="p-5 space-y-4">
                    {/* Items */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-start text-sm">
                        <div className="flex gap-2 text-gray-900">
                          <span className="font-medium bg-gray-100 w-5 h-5 flex items-center justify-center rounded text-xs">1</span>
                          <span>Beef Biryani</span>
                        </div>
                        <span className="font-medium text-gray-900">৳350</span>
                      </div>
                      <div className="flex justify-between items-start text-sm">
                        <div className="flex gap-2 text-gray-900">
                          <span className="font-medium bg-gray-100 w-5 h-5 flex items-center justify-center rounded text-xs">1</span>
                          <span>Chicken Tikka</span>
                        </div>
                        <span className="font-medium text-gray-900">৳280</span>
                      </div>
                      <div className="flex justify-between items-start text-sm">
                        <div className="flex gap-2 text-gray-900">
                          <span className="font-medium bg-gray-100 w-5 h-5 flex items-center justify-center rounded text-xs">1</span>
                          <span>Mango Lassi</span>
                        </div>
                        <span className="font-medium text-gray-900">৳85</span>
                      </div>
                    </div>

                    <Separator className="bg-gray-100" />
                    
                    {/* Promo */}
                    <div className="flex gap-2">
                      <Input placeholder="Promo code" className="h-9 text-sm focus-visible:ring-[#0A7A5A]" />
                      <Button variant="outline" className="h-9 px-3 shrink-0 text-sm font-medium border-gray-200 text-gray-600 hover:bg-gray-50 hover:text-gray-900">
                        Apply
                      </Button>
                    </div>

                    <Separator className="bg-gray-100" />

                    {/* Totals */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span>
                        <span className="text-gray-900">৳715</span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Delivery Fee</span>
                        <span className="text-gray-900">৳60</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg pt-2 mt-2 border-t border-dashed border-gray-200 text-gray-900">
                        <span>Total</span>
                        <span className="text-[#0A7A5A]">৳775</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-5 pt-0 bg-white">
                  <Button className="w-full h-12 bg-[#0A7A5A] hover:bg-[#086349] text-white text-base font-semibold shadow-md shadow-[#0A7A5A]/20 transition-all rounded-lg flex items-center justify-center gap-2 group">
                    Place Order — ৳775
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500 font-medium bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <Lock className="w-4 h-4 text-green-600" />
                <span>100% Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
