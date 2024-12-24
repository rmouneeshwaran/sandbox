"use client";
import React, { useState } from "react";
import { Sidebar, SidebarHeader, SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, BookOpen, PenTool, Settings, Tally1, LogOut } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion";
import { useRouter, usePathname } from "next/navigation";


const sidebar: React.FC = () => {
// State to control the active accordion item
const [activeAccordion, setActiveAccordion] = useState<string>("item-1");

const router = useRouter();
const pathname = usePathname(); // Get the current route path

const handleLogout = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error("Failed to logout");
    }

    router.push("/");
  } catch (err) {
    console.error("Logout failed:", err);
  }
};

// Helper function to apply "active" class dynamically
const isActive = (href: string) => pathname === href ? "active" : "";

  return (
    <SidebarProvider>
      <Sidebar className="sidebar">
        <div className="sidebarContent">
          <SidebarHeader>
            <Tabs defaultValue="menu" className="tabs">
              <TabsList>
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="workspace">Workspace</TabsTrigger>
              </TabsList>
              <TabsContent value="menu">
                <aside>
                  <nav>
                    <ul className="sidebarMenu">
                      <Link className={`sidebarItem ${isActive("/dashboard")}`} href="/dashboard">
                        <Home size={18} />
                        <span>Home</span>
                      </Link>
                      <Link className={`sidebarItem ${isActive("/dashboard/guidecenter")}`} href="/dashboard/guidecenter">
                        <BookOpen size={18} />
                        <span>Guide Center</span>
                      </Link>
                      <Link className={`sidebarItem ${isActive("/dashboard/apiexplorer")}`} href="/dashboard/apiexplorer">
                        <PenTool size={18} />
                        <span>API Explorer</span>
                      </Link>
                      <Link className={`sidebarItem ${isActive("/dashboard/administrator")}`} href="/dashboard/administrator">
                        <Settings size={18} />
                        <span>Administrator</span>
                      </Link>
                    </ul>
                  </nav>
                </aside>
              </TabsContent>
              <TabsContent value="workspace">
                <aside>
                  <nav>
              {/* Launchpad accordian */}
                    <ul className="sidebarMenu">
                      <Accordion className="Accordion" type="single" collapsible value={activeAccordion} // Use state for active accordion item
                        onValueChange={(value) => setActiveAccordion(value)} >
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Launchpad</AccordionTrigger>
                          <AccordionContent className="AccordionContent" >
                            <li className={`sidebarItem ${isActive("/dashboard")}`}>
                              <Link href="/dashboard">
                                <Tally1 size={18} />
                                <span>Worksapce 1</span>
                              </Link>
                            </li>
                            <li className={`sidebarItem ${isActive("/dashboard/workspace")}`}>
                              <Link href="/dashboard/workspace">
                                <Tally1 size={18} />
                                <span>Worksapce 2</span>
                              </Link>
                            </li>
                            <li className={`sidebarItem ${isActive("/dashboard/workspace3")}`}>
                              <Link href="/dashboard/workspace3">
                                <Tally1 size={18} />
                                <span>Workspace 3</span>
                              </Link>
                            </li>
                            <li className={`sidebarItem ${isActive("/dashboard/workspace4")}`}>
                              <Link href="/dashboard/workspace4">
                                <Tally1 size={18} />
                                <span>Workspace 4</span>
                              </Link>
                            </li>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>                 
                     </ul>

             {/* sandbox accordian */}
                     <ul className="sidebarMenu">
                     <Accordion className="Accordion" type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>Sandbox</AccordionTrigger>
                          <AccordionContent className="AccordionContent">
                            <li className={`sidebarItem ${isActive("/dashboard/workspace1")}`}>
                              <Link href="/dashboard">
                                <Tally1 size={18} />
                                <span>Worksapce 1</span>
                              </Link>
                            </li>
                            <li className={`sidebarItem ${isActive("/dashboard/workspace2")}`}>
                              <Link href="/dashboard/workspace2">
                                <Tally1 size={18} />
                                <span>Worksapce 2</span>
                              </Link>
                            </li>
                            <li className={`sidebarItem ${isActive("/dashboard/workspace3")}`}>
                              <Link href="/dashboard/workspace3">
                                <Tally1 size={18} />
                                <span>Workspace 3</span>
                              </Link>
                            </li>
                            <li className={`sidebarItem ${isActive("/dashboard/workspace4")}`}>
                              <Link href="/dashboard/workspace4">
                                <Tally1 size={18} />
                                <span>Workspace 4</span>
                              </Link>
                            </li>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>    
                    </ul>
                  </nav>
                </aside>
              </TabsContent>
            </Tabs>
          </SidebarHeader>
        </div>

        <div className="sidebarFooter">
          <ul className="sidebarMenu">
            <Link className="sidebarItem" href="" >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
            <Link className="sidebarItem" onClick={handleLogout} href={""}>
              <LogOut size={18} />
              <span>Logout</span>
            </Link>
          </ul>
        </div>

      </Sidebar>
    </SidebarProvider>
  );
};

export default sidebar;
