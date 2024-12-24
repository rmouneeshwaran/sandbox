import React from "react";
import Sidebar from "@/components/ui/app-sidebar";
import TopNav from "@/components/ui/topnav";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
      <div className="dashboard-layout">
        {/* Fixed Sidebar */}
     
        <TopNav />
        <div className="main-container">
          {/* Fixed Top Navbar */}
         
          <Sidebar />
          {/* Scrollable Content Area */}
          <div className="content">
            {children}
            </div>      
        </div>
      </div>
    );
  }