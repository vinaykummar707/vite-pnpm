import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from '@/components/ui/sidebar';

import { DialysisUnitSelect } from './DialysisUnitSelect';
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

// Menu items.
const items = [
    {
        title: 'Dashboard',
        url: '/',
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
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarHeader>Nephy</SidebarHeader>
                    <SidebarMenuItem>
                        <DialysisUnitSelect />
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
                                    <SidebarMenuButton asChild>
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
