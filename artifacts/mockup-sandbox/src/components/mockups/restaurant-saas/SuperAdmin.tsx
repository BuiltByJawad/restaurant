import React, { useState } from 'react';
import { 
  Crown, 
  LayoutDashboard, 
  Store, 
  RefreshCcw, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LifeBuoy,
  Plus,
  MoreVertical,
  ArrowUpRight,
  Users,
  UtensilsCrossed,
  Activity,
  LogOut,
  Bell,
  Search,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  Body,
  Cell,
  Head,
  Header,
  Row,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const chartData = [
  { name: 'Nov', revenue: 95000 },
  { name: 'Dec', revenue: 110000 },
  { name: 'Jan', revenue: 105000 },
  { name: 'Feb', revenue: 115000 },
  { name: 'Mar', revenue: 120000 },
  { name: 'Apr', revenue: 124500 },
];

const tenants = [
  { id: 1, name: "Dhaka Biryani House", location: "Dhaka", plan: "Pro", revenue: "৳45,000", status: "Active", joined: "2025-01-15" },
  { id: 2, name: "Chittagong Seafood", location: "Chittagong", plan: "Enterprise", revenue: "৳120,000", status: "Active", joined: "2024-11-02" },
  { id: 3, name: "Sylhet Spice", location: "Sylhet", plan: "Starter", revenue: "৳15,000", status: "Trial", joined: "2026-03-28" },
  { id: 4, name: "Burger Bhai", location: "Dhaka", plan: "Pro", revenue: "৳32,000", status: "Suspended", joined: "2025-06-10" },
  { id: 5, name: "Cox's Bazar Seafood", location: "Chittagong", plan: "Starter", revenue: "৳8,000", status: "Active", joined: "2026-04-01" },
];

const activities = [
  { id: 1, text: "Dhaka Biryani House upgraded to Pro", time: "2 hours ago", type: "upgrade" },
  { id: 2, text: "New restaurant: Cox's Bazar Seafood signed up", time: "5 hours ago", type: "signup" },
  { id: 3, text: "Payment received from Sylhet Spice ৳2,499", time: "1 day ago", type: "payment" },
];

export function SuperAdmin() {
  const [activeTab, setActiveTab] = useState('overview');

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'restaurants', label: 'Restaurants', icon: Store },
    { id: 'subscriptions', label: 'Subscriptions', icon: RefreshCcw },
    { id: 'payments', label: 'Payments', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'support', label: 'Support', icon: LifeBuoy },
  ];

  return (
    <div className="flex h-screen bg-[#0f1115] text-slate-200 font-sans overflow-hidden dark">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-800 bg-[#0a0c10] flex flex-col flex-shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <div className="flex items-center gap-2 text-[#0A7A5A]">
            <Crown className="h-6 w-6" />
            <span className="font-bold text-lg text-white tracking-tight">FoodFlow Admin</span>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
                    isActive 
                      ? 'bg-[#0A7A5A]/10 text-[#0A7A5A] font-medium' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? 'text-[#0A7A5A]' : 'text-slate-500'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-slate-800/50 cursor-pointer transition-colors">
            <Avatar className="h-9 w-9 border border-slate-700">
              <AvatarFallback className="bg-slate-800 text-slate-300">AD</AvatarFallback>
            </Avatar>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-slate-200 truncate">Admin User</span>
              <span className="text-xs text-slate-500 truncate">super@foodflow.com</span>
            </div>
            <LogOut className="h-4 w-4 text-slate-500 hover:text-slate-300" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 bg-[#0a0c10]/80 backdrop-blur-md flex items-center justify-between px-8 flex-shrink-0 z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-white">Platform Overview</h1>
            <Badge variant="outline" className="bg-[#0A7A5A]/10 text-[#0A7A5A] border-[#0A7A5A]/20">
              April 2026
            </Badge>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
              <Input 
                type="search" 
                placeholder="Search restaurants, users..." 
                className="w-full bg-slate-900 border-slate-800 pl-9 text-sm focus-visible:ring-[#0A7A5A]"
              />
            </div>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Bell className="h-5 w-5" />
            </Button>
            <Button className="bg-[#0A7A5A] hover:bg-[#086349] text-white gap-2">
              <Plus className="h-4 w-4" />
              Add Restaurant
            </Button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card className="bg-[#13161c] border-slate-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-medium text-slate-400">Active Restaurants</CardTitle>
                  <Store className="h-4 w-4 text-[#0A7A5A]" />
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="text-2xl font-bold text-white">47</div>
                  <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" /> +12% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#13161c] border-slate-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-medium text-slate-400">Total Orders Today</CardTitle>
                  <UtensilsCrossed className="h-4 w-4 text-[#0A7A5A]" />
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="text-2xl font-bold text-white">1,284</div>
                  <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" /> +5.2% from yesterday
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#13161c] border-slate-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-medium text-slate-400">Platform Revenue</CardTitle>
                  <CreditCard className="h-4 w-4 text-[#0A7A5A]" />
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="text-2xl font-bold text-white">৳124,500</div>
                  <p className="text-xs text-emerald-500 flex items-center gap-1 mt-1">
                    <ArrowUpRight className="h-3 w-3" /> +18% from last month
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-[#13161c] border-slate-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-medium text-slate-400">New Signups</CardTitle>
                  <Users className="h-4 w-4 text-[#0A7A5A]" />
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="text-2xl font-bold text-white">3</div>
                  <p className="text-xs text-slate-500 mt-1">In the last 7 days</p>
                </CardContent>
              </Card>

              <Card className="bg-[#13161c] border-slate-800 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
                  <CardTitle className="text-sm font-medium text-slate-400">Churn</CardTitle>
                  <Activity className="h-4 w-4 text-rose-500" />
                </CardHeader>
                <CardContent className="px-4 pb-4">
                  <div className="text-2xl font-bold text-white">1</div>
                  <p className="text-xs text-rose-500 flex items-center gap-1 mt-1">
                    Restaurant suspended
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Revenue Chart */}
              <Card className="lg:col-span-2 bg-[#13161c] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-200">Platform Revenue</CardTitle>
                  <CardDescription className="text-slate-400">Monthly revenue for the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                        <XAxis 
                          dataKey="name" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 12 }}
                          dy={10}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#64748b', fontSize: 12 }}
                          tickFormatter={(value) => `৳${value / 1000}k`}
                        />
                        <Tooltip 
                          cursor={{ fill: '#1e293b' }}
                          contentStyle={{ backgroundColor: '#0f1115', borderColor: '#1e293b', color: '#f8fafc' }}
                          itemStyle={{ color: '#0A7A5A' }}
                          formatter={(value: number) => [`৳${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Bar 
                          dataKey="revenue" 
                          fill="#0A7A5A" 
                          radius={[4, 4, 0, 0]} 
                          maxBarSize={40}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Feed */}
              <Card className="bg-[#13161c] border-slate-800">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-200">Recent Activity</CardTitle>
                  <CardDescription className="text-slate-400">Latest platform events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {activities.map((activity, index) => (
                      <div key={activity.id} className="flex gap-4 relative">
                        {index !== activities.length - 1 && (
                          <div className="absolute left-4 top-8 bottom-[-24px] w-px bg-slate-800"></div>
                        )}
                        <div className="relative z-10 w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0">
                          {activity.type === 'upgrade' && <ArrowUpRight className="h-4 w-4 text-blue-400" />}
                          {activity.type === 'signup' && <Store className="h-4 w-4 text-emerald-400" />}
                          {activity.type === 'payment' && <CreditCard className="h-4 w-4 text-[#0A7A5A]" />}
                        </div>
                        <div className="flex flex-col pt-1.5">
                          <p className="text-sm text-slate-300 font-medium leading-tight">{activity.text}</p>
                          <span className="text-xs text-slate-500 mt-1">{activity.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-6 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                    View All Activity
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Tenants Table */}
            <Card className="bg-[#13161c] border-slate-800">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg text-slate-200">Restaurant Tenants</CardTitle>
                  <CardDescription className="text-slate-400">Manage all registered restaurants</CardDescription>
                </div>
                <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white">
                  View All
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border border-slate-800 overflow-hidden">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-900 text-slate-400 font-medium">
                      <tr>
                        <th className="px-4 py-3 font-medium">Restaurant</th>
                        <th className="px-4 py-3 font-medium">Location</th>
                        <th className="px-4 py-3 font-medium">Plan</th>
                        <th className="px-4 py-3 font-medium">Monthly Rev.</th>
                        <th className="px-4 py-3 font-medium">Status</th>
                        <th className="px-4 py-3 font-medium">Joined</th>
                        <th className="px-4 py-3 font-medium text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {tenants.map((tenant) => (
                        <tr key={tenant.id} className="hover:bg-slate-800/50 transition-colors">
                          <td className="px-4 py-3 font-medium text-slate-200">{tenant.name}</td>
                          <td className="px-4 py-3 text-slate-400">{tenant.location}</td>
                          <td className="px-4 py-3">
                            <Badge variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                              {tenant.plan}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-slate-300 font-medium">{tenant.revenue}</td>
                          <td className="px-4 py-3">
                            <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ${
                              tenant.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                              tenant.status === 'Trial' ? 'bg-blue-500/10 text-blue-400' :
                              'bg-rose-500/10 text-rose-400'
                            }`}>
                              {tenant.status === 'Active' && <CheckCircle2 className="h-3 w-3" />}
                              {tenant.status === 'Trial' && <RefreshCcw className="h-3 w-3" />}
                              {tenant.status === 'Suspended' && <Activity className="h-3 w-3" />}
                              {tenant.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-400">{tenant.joined}</td>
                          <td className="px-4 py-3 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-800">
                                  <span className="sr-only">Open menu</span>
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-slate-900 border-slate-800 text-slate-300">
                                <DropdownMenuItem className="hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white cursor-pointer">
                                  View details
                                </DropdownMenuItem>
                                <DropdownMenuItem className="hover:bg-slate-800 hover:text-white focus:bg-slate-800 focus:text-white cursor-pointer">
                                  Edit tenant
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-slate-800" />
                                <DropdownMenuItem className="text-rose-400 hover:bg-slate-800 hover:text-rose-300 focus:bg-slate-800 focus:text-rose-300 cursor-pointer">
                                  Suspend account
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
