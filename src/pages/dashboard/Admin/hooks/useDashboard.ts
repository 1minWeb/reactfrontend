import { useState } from 'react';
import { useRedux } from 'hooks';
import { getDashboardDataAction } from 'redux/actions';
import { DashboardData } from '../types';

export default function useDashboard() {
    const { dispatch, appSelector } = useRedux();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [dateRange, setDateRange] = useState({
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        endDate: new Date().toISOString(),
    });

    const {
        dashboardData,
    }: {
        dashboardData: DashboardData;
    } = appSelector((state: any) => ({
        dashboardData: state.User.dashboardData,
    }));

    /**
     * Fetch dashboard data
     */
    const fetchDashboardData = async () => {
        setLoading(true);
        setError(null);
        try {
            await dispatch(getDashboardDataAction(dateRange.startDate, dateRange.endDate));
        } catch (err: any) {
            setError(err.message || 'Failed to fetch dashboard data');
            console.error('Failed to fetch dashboard data:', err);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Update date range and refresh data
     */
    const updateDateRange = async (startDate: string, endDate: string) => {
        setDateRange({ startDate, endDate });
        // Optionally fetch data immediately when date range changes
        await fetchDashboardData();
    };

    return {
        dashboardData,
        loading,
        error,
        dateRange,
        updateDateRange,
        fetchDashboardData,
    };
}
