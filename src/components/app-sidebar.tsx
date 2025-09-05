import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar
} from '@/components/ui/sidebar';

import {
    Armchair,
    Calendar,
    CalendarClock,
    CircleUser,
    Home,
    Inbox,
    LayoutGrid,
    Search,
    Settings,
    Users,
    Warehouse,
    WashingMachine
} from 'lucide-react';
import { DialysisUnitSelect } from './DialysisUnitSelect';
import { useLocation } from 'react-router-dom';

// Menu items.
const items = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid
    },
    {
        title: 'Dialysis Units',
        url: '/dialysis-units',
        icon: Armchair
    },

    {
        title: 'Patients',
        url: '/patients',
        icon: Users
    },
   
    {
        title: 'Machines',
        url: '/machines',
        icon: WashingMachine
    },
    {
        title: 'Technicians',
        url: '/technicians',
        icon: CircleUser
    },
    {
        title: 'Records',
        url: '/records',
        icon: WashingMachine
    },
    {
        title: 'Departments',
        url: '/departments',
        icon: Warehouse
    },
    {
        title: 'Shifts & Schedules',
        url: '/shifts',
        icon: CalendarClock
    }
];

export function AppSidebar() {
    const location = useLocation();
    const { state } = useSidebar();
    return (
        <Sidebar collapsible='icon' variant='sidebar'>
            <SidebarHeader>
                <SidebarMenu>
                    {state === 'expanded' && (
                        <SidebarHeader className='text-xl'>Nephy</SidebarHeader>

                    )}
                    <SidebarMenuItem>
                        {/* Only show DialysisUnitSelect when sidebar is expanded */}
                        {state === 'expanded' && (
                            <SidebarMenuItem>
                                <DialysisUnitSelect />
                            </SidebarMenuItem>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton isActive={location.pathname === item.url} asChild>
                                        <a href={item.url}>
                                            <item.icon strokeWidth={2} />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
}
