import { AdminSidebar } from "@/components/dashboard/admin-sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
}
