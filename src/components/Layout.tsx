// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import NavigationBar from './NavigationBar';


const Layout: React.FC = () => {
  return (
    <SidebarProvider  defaultOpen={true}>
    <div className="flex h-screen w-screen">
      <AppSidebar />
      <div className="flex  flex-col flex-1">
        <NavigationBar/>
        <main className="flex-1  overflow-auto ">
        <div className="max-w-7xl p-4 mx-auto w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
    </SidebarProvider>
  );
};

export default Layout;
