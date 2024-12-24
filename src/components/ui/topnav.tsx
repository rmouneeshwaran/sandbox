import React from "react";
import Image from "next/image";
import { Search, Bell } from "lucide-react"; // Use any ShadCN or Lucide icons


const TopNav: React.FC = () => {
  return (
    <div className="topnav">
      {/* Logo Section */}
      <div className="topnav-logo">
        <h1 className="topnav-title">MVNx Sandbox</h1>
      </div>

      {/* Right Section: Icons */}
      <div className="topnav-icons">
        <button className="topnav-icon">
          <Search />
        </button>

        <button className="topnav-icon">
          <Bell />
        </button>

        <button className="topnav-profile">
          <Image
            src="/avatar.png" // Replace with your avatar image
            alt="Profile"
            width={40}
            height={40}
          />
        </button>
      </div>
    </div>
  );
};

export default TopNav;
