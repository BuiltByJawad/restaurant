import React from "react";
import { 
  LayoutDashboard, 
  ShoppingBag, 
  UtensilsCrossed, 
  Users, 
  BarChart3, 
  CreditCard, 
  Settings, 
  Bell, 
  ExternalLink, 
  TrendingUp, 
  MoreVertical, 
  CheckCircle2,
  Clock,
  ChefHat
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function Dashboard() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-[#0B1120] text-slate-300 flex flex-col z-10 border-r border-slate-800">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800/50">
          <div className="w-8 h-8 rounded-md bg-[#0A7A5A] flex items-center justify-center shrink-0 overflow-hidden">
             <img src="/__mockup/images/biryani-logo.png" alt="Logo" className="w-full h-full object-cover opacity-90" />
          </div>
          <span className="font-semibold text-white tracking-tight leading-tight">Dhaka Biryani<br/>House</span>
        </div>
        
        <nav className="flex-1 py-6 px-3 space-y-1">
          <NavItem icon={<LayoutDashboard size={18} />} label="Dashboard" active />
          <NavItem icon={<ShoppingBag size={18} />} label="Orders" badge="3" />
          <NavItem icon={<UtensilsCrossed size={18} />} label="Menu" />
          <NavItem icon={<Users size={18} />} label="Customers" />
          <NavItem icon={<BarChart3 size={18} />} label="Analytics" />
          <NavItem icon={<CreditCard size={18} />} label="Payments" />
        </nav>

        <div className="p-3 mt-auto">
          <NavItem icon={<Settings size={18} />} label="Settings" />
        </div>
        
        <div className="p-4 border-t border-slate-800/50 flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-slate-700">
            <AvatarImage src="/__mockup/images/avatar-rahim.png" alt="Rahim" />
            <AvatarFallback className="bg-slate-800 text-slate-300">RH</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Rahim Uddin</p>
            <p className="text-xs text-slate-500 truncate">Owner</p>
          </div>
          <Badge className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-[10px] px-1.5 py-0 uppercase tracking-wider font-bold text-white border-0">Pro</Badge>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-slate-50/80 backdrop-blur-md border-b border-slate-200 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Good morning, Rahim!</h1>
            <p className="text-sm text-slate-500 mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center gap-2 h-9 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              View your store <ExternalLink size={14} />
            </Button>
            <div className="relative">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-200">
                <Bell size={18} />
              </Button>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border-2 border-slate-50"></span>
            </div>
          </div>
        </header>

        <div className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard title="Today's Orders" value="34" trend="+12%" icon={<ShoppingBag size={20} className="text-[#0A7A5A]" />} />
            <StatCard title="Revenue Today" value="৳8,450" trend="+8%" icon={<TrendingUp size={20} className="text-[#0A7A5A]" />} />
            <StatCard title="Pending Orders" value="3" alert icon={<Clock size={20} className="text-red-500" />} />
            <StatCard title="Avg Order Value" value="৳248" icon={<CreditCard size={20} className="text-[#0A7A5A]" />} />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Live Orders Panel */}
            <Card className="xl:col-span-2 border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <CardTitle className="text-lg font-semibold text-slate-900">Live Orders</CardTitle>
                  <CardDescription>Monitor and manage incoming orders.</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-[#0A7A5A] hover:text-[#086349] hover:bg-emerald-50">View all</Button>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50 hover:bg-slate-50/50 border-b-slate-100">
                      <TableHead className="w-[100px] text-slate-500">Order ID</TableHead>
                      <TableHead className="text-slate-500">Customer</TableHead>
                      <TableHead className="text-slate-500">Items</TableHead>
                      <TableHead className="text-slate-500">Total</TableHead>
                      <TableHead className="text-slate-500">Status</TableHead>
                      <TableHead className="text-slate-500">Time</TableHead>
                      <TableHead className="text-right text-slate-500"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <OrderRow id="#ORD-7391" name="Shafiqul Islam" items="3x Beef Biryani, 1x Borhani" total="৳750" status="Pending" time="10:42 AM" action />
                    <OrderRow id="#ORD-7390" name="Nusrat Jahan" items="1x Chicken Tikka, 2x Naan" total="৳320" status="Preparing" time="10:35 AM" />
                    <OrderRow id="#ORD-7389" name="Aminur Rahman" items="2x Mutton Kebab" total="৳440" status="Ready" time="10:28 AM" />
                    <OrderRow id="#ORD-7388" name="Farhana Akter" items="1x Beef Tehari" total="৳220" status="Delivered" time="10:15 AM" />
                    <OrderRow id="#ORD-7387" name="Rakib Hossain" items="4x Chicken Biryani" total="৳880" status="Delivered" time="09:50 AM" />
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Revenue Chart */}
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="pb-2 border-b border-slate-100">
                <CardTitle className="text-lg font-semibold text-slate-900">Revenue (Last 7 Days)</CardTitle>
                <CardDescription>Daily gross volume.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-4 px-6 flex flex-col items-center justify-center">
                <div className="w-full h-[220px] flex items-end justify-between gap-2 px-2">
                  {[40, 65, 45, 80, 55, 90, 100].map((height, i) => (
                    <div key={i} className="w-full flex flex-col items-center gap-2 group relative">
                      <div className="absolute -top-8 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        ৳{height * 100}
                      </div>
                      <div 
                        className={`w-full rounded-t-sm transition-all duration-300 ${i === 6 ? 'bg-[#0A7A5A]' : 'bg-slate-200 group-hover:bg-[#0A7A5A]/60'}`} 
                        style={{ height: `${height}%` }}
                      ></div>
                      <span className="text-[10px] text-slate-400 font-medium">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Items */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-900">Popular Items Today</h2>
              <Button variant="link" className="text-[#0A7A5A] hover:text-[#086349] p-0 h-auto">Manage Menu</Button>
            </div>
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x">
              <PopularItemCard name="Beef Biryani" sales="34 sold" img="/__mockup/images/beef-biryani.png" price="৳220" trend="+12%" />
              <PopularItemCard name="Chicken Tikka" sales="28 sold" img="/__mockup/images/chicken-tikka.png" price="৳160" trend="+5%" />
              <PopularItemCard name="Mutton Kebab" sales="21 sold" img="/__mockup/images/mutton-kebab.png" price="৳200" trend="-2%" />
              <div className="min-w-[280px] h-[120px] rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-[#0A7A5A] hover:border-[#0A7A5A]/50 hover:bg-[#0A7A5A]/5 transition-colors cursor-pointer snap-start">
                <ChefHat size={24} className="mb-2" />
                <span className="text-sm font-medium">Add new item</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Subcomponents

function NavItem({ icon, label, active, badge }: { icon: React.ReactNode, label: string, active?: boolean, badge?: string }) {
  return (
    <a href="#" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? 'bg-[#0A7A5A] text-white shadow-sm' : 'text-slate-400 hover:text-white hover:bg-slate-800/50'}`}>
      {icon}
      {label}
      {badge && (
        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center leading-none">
          {badge}
        </span>
      )}
    </a>
  );
}

function StatCard({ title, value, trend, icon, alert }: { title: string, value: string, trend?: string, icon: React.ReactNode, alert?: boolean }) {
  return (
    <Card className={`border-slate-200 shadow-sm ${alert ? 'border-red-200 bg-red-50/30' : ''}`}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
            <h3 className={`text-2xl font-bold ${alert ? 'text-red-600' : 'text-slate-900'}`}>{value}</h3>
          </div>
          <div className={`p-2 rounded-lg ${alert ? 'bg-red-100' : 'bg-[#0A7A5A]/10'}`}>
            {icon}
          </div>
        </div>
        {trend && (
          <div className="mt-4 flex items-center text-sm">
            <span className={`font-medium ${trend.startsWith('+') ? 'text-emerald-600' : 'text-red-600'}`}>
              {trend}
            </span>
            <span className="text-slate-400 ml-1.5">vs yesterday</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function OrderRow({ id, name, items, total, status, time, action }: { id: string, name: string, items: string, total: string, status: string, time: string, action?: boolean }) {
  const statusStyles: Record<string, string> = {
    'Pending': 'bg-red-100 text-red-700 border-red-200',
    'Preparing': 'bg-amber-100 text-amber-700 border-amber-200',
    'Ready': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'Delivered': 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <TableRow className="border-b-slate-100 hover:bg-slate-50">
      <TableCell className="font-medium text-slate-900">{id}</TableCell>
      <TableCell className="text-slate-700 font-medium">{name}</TableCell>
      <TableCell className="text-slate-500 max-w-[200px] truncate" title={items}>{items}</TableCell>
      <TableCell className="font-semibold text-slate-900">{total}</TableCell>
      <TableCell>
        <Badge variant="outline" className={`${statusStyles[status]} text-[11px] px-2 py-0.5 uppercase tracking-wide font-semibold`}>
          {status}
        </Badge>
      </TableCell>
      <TableCell className="text-slate-500 text-sm">{time}</TableCell>
      <TableCell className="text-right">
        {action ? (
          <div className="flex justify-end gap-2">
            <Button size="sm" className="h-8 bg-[#0A7A5A] hover:bg-[#086349] text-white text-xs px-3">Accept</Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600">
              <MoreVertical size={16} />
            </Button>
          </div>
        ) : (
          <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-600">
            <MoreVertical size={16} />
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
}

function PopularItemCard({ name, sales, img, price, trend }: { name: string, sales: string, img: string, price: string, trend: string }) {
  const isPositive = trend.startsWith('+');
  return (
    <div className="min-w-[280px] bg-white rounded-xl border border-slate-200 shadow-sm p-3 flex gap-4 snap-start hover:border-[#0A7A5A]/30 hover:shadow-md transition-all">
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-slate-100 relative">
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-semibold text-slate-900 leading-tight">{name}</h4>
          <span className="font-semibold text-slate-700 text-sm">{price}</span>
        </div>
        <p className="text-sm text-slate-500 mb-2">{sales}</p>
        <div className="flex items-center text-xs font-medium">
          <span className={isPositive ? 'text-emerald-600' : 'text-red-600'}>{trend}</span>
          <span className="text-slate-400 ml-1">this week</span>
        </div>
      </div>
    </div>
  );
}
