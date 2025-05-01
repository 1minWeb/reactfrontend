import { Row, Col } from 'react-bootstrap';
import { HyperDatepicker } from 'components';
import Statistics from './Statistics';
import PerformanceChart from './PerformanceChart';
import Activity from './Activity';
import Products from './Poojaris';
import useDashboard from './hooks/useDashboard';
import { useEffect } from 'react';

const AdminDashboard = () => {
    // Get default date range (3 months ago to today)
    const getDefaultDateRange = () => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 3); // Set to 3 months ago
        return {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString()
        };
    };

    const {
        dashboardData,
        loading,
        error,
        dateRange,
        updateDateRange,
        fetchDashboardData
    } = useDashboard();

    useEffect(() => {
        // Set default date range when component mounts
        const { startDate, endDate } = getDefaultDateRange();
        updateDateRange(startDate, endDate);
        // Fetch the dashboard data when the component mounts
        fetchDashboardData();
    }, []);

    // Handle date change
    const handleDateChange = (date: Date | null) => {
        if (date) {
            const now = new Date();
            updateDateRange(date.toISOString(), now.toISOString());
        }
    };

    return (
        <>
            <Row>
                <Col xs={12}>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex">
                                <div className="input-group align-items-center">
                                    <span className="me-2">Fetch data from</span>
                                    <HyperDatepicker
                                        value={new Date(dateRange.startDate)}
                                        inputClass="form-control-light"
                                        onChange={handleDateChange}
                                    />
                                </div>
                                {/* <Link to="#" className="btn btn-primary ms-2" onClick={() => fetchDashboardData()}>
                                    <i className="mdi mdi-autorenew"></i>
                                </Link>
                                <Link to="#" className="btn btn-primary ms-1">
                                    <i className="mdi mdi-filter-variant"></i>
                                </Link> */}
                            </form>
                        </div>
                        <h4 className="page-title">Dashboard</h4>
                    </div>
                </Col>
            </Row >

            {loading && (
                <Row>
                    <Col>
                        <div className="text-center my-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    </Col>
                </Row>
            )
            }

            {
                error && (
                    <Row>
                        <Col>
                            <div className="alert alert-danger" role="alert">
                                {error}
                            </div>
                        </Col>
                    </Row>
                )
            }

            {
                !loading && !error && (
                    <>
                        <Row>
                            <Col>
                                <Statistics dashboardData={dashboardData} />
                            </Col>
                        </Row>

                        <Row>
                            <Col>
                                <PerformanceChart />
                            </Col>
                        </Row>
                        <Row>
                            {/* <Col lg={8}>
                            <RevenueChart />
                        </Col> */}
                            {/* <Col lg={4}>
                            <RevenueByLocationChart />
                        </Col> */}
                        </Row>

                        <Row>
                            <Col xl={{ span: 6, order: 1 }} lg={{ span: 12, order: 2 }}>
                                <Products dashboardData={dashboardData} />
                            </Col>
                            {/* <Col xl={3} lg={{ span: 6, order: 1 }}>
                            <SalesChart />
                        </Col> */}
                            <Col xl={3} lg={{ span: 6, order: 1 }}>
                                <Activity dashboardData={dashboardData} />
                            </Col>
                        </Row >
                    </>
                )
            }
        </>
    );
};

export { AdminDashboard }
