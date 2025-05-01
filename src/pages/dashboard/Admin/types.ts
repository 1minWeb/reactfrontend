// Define types for dashboard data
interface DashboardDateRange {
    startDate: string;
    endDate: string;
}

interface DashboardOverview {
    totalProducts: number;
    totalActiveProducts: number;
    totalServices: number;
    totalEvents: number;
    totalCustomers: number;
    totalPoojaris: number;
    totalOrders: number;
    totalRituals: number;
    totalUsers: number;
}

interface Revenue {
    orderRevenue: number;
    monthlyRevenue: any[];
    currentMonthStats: any[];
}

interface Payments {
    pendingPayments: number;
    completedPayments: number;
    completionRate: number;
}

interface Customer {
    id: number;
    customername: string;
    firstname: string;
    middlename: string | null;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    gender: string;
    dob: string | null;
    role: string;
    isActive: boolean;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Poojari {
    id: number;
    name: string;
    rating: number;
    poojasDone: number;
    isAvailable: boolean;
    isVerified: boolean;
    languages: string[];
    experience: number;
}

interface RecentActivity {
    recentOrders: any[];
    recentCustomers: Customer[];
    recentPoojaris: Poojari[];
    recentServices: any[];
    topProducts: any[];
    topPoojaris: Poojari[];
}

interface CustomerSegment {
    segment: string;
    customer_count: number;
}

interface Analytics {
    customerSegments: CustomerSegment[];
    orderGrowth: number;
    conversionRate: number;
}

interface Stats {
    averageOrderValue: number;
    activePoojariPercentage: number;
    verifiedPoojariPercentage: number;
}

export interface DashboardData {
    dateRange: DashboardDateRange;
    overview: DashboardOverview;
    revenue: Revenue;
    payments: Payments;
    recentActivity: RecentActivity;
    analytics: Analytics;
    stats: Stats;
}
