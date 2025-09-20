// Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarProvider } from './ui/sidebar';
import { AppSidebar } from './app-sidebar';
import NavigationBar from './NavigationBar';
import { Toaster } from 'sonner';
import { DefaultPageLayout } from '@/ui';


const Layout: React.FC = () => {
  return (
    // <SidebarProvider   defaultOpen={true}>
    // <div className="flex h-screen w-screen overflow-hidden">
    //   {/* <AppSidebar /> */}
    //   <div className="flex  flex-col  flex-1">
    //     <NavigationBar/>
    //     <main className="flex-1 overflow-auto max-w-7xl mx-auto container no-scrollbar  ">
    //         <Outlet />
    //     </main>
    //   </div>
    // </div>
    // <Toaster/>
    // </SidebarProvider>
    <DefaultPageLayout>
      <Outlet />
    </DefaultPageLayout>
  );
};

export default Layout;
