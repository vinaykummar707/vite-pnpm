// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import NavigationBar from './NavigationBar';


const Layout: React.FC = () => {
  return (
    <SidebarProvider   defaultOpen={true}>
    <div className="flex h-screen w-screen overflow-hidden">
      <AppSidebar />
      <div className="flex  flex-col  flex-1">
        <NavigationBar/>
        <main className="flex-1 overflow-auto no-scrollbar   p-6 bg-gradient-to-b from-white to-background dark:from-secondary dark:to-background mx-4  rounded-2xl  ">
            <Outlet />
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default Layout;
