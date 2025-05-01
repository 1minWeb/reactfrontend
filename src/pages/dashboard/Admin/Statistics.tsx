import { Row, Col } from 'react-bootstrap';
import { StatisticsWidget } from 'components';
import { DashboardData } from './types';

const Statistics = ({ dashboardData }: { dashboardData: DashboardData }) => {
    return (
        <>
            <Row>
                <Col sm={6} xl={3}>
                    <StatisticsWidget
                        icon="mdi mdi-account-multiple"
                        description="Number of Customers"
                        title="Customers"
                        stats={dashboardData.overview.totalCustomers.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '5.27%',
                        }}
                    ></StatisticsWidget>
                </Col>

                <Col sm={6} xl={3}>
                    <StatisticsWidget
                        icon="mdi mdi-cart-plus"
                        description="Number of Orders"
                        title="Orders"
                        stats={dashboardData.overview.totalOrders.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '2.00%',
                        }}
                    ></StatisticsWidget>
                </Col>

                <Col sm={6} xl={3}>
                    <StatisticsWidget
                        icon="mdi mdi-package-variant-closed"
                        description="Total Products"
                        title="Products"
                        stats={dashboardData.overview.totalProducts.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '2.00%',
                        }}
                    ></StatisticsWidget>
                </Col>

                <Col sm={6} xl={3}>
                    <StatisticsWidget
                        icon="mdi mdi-package-variant"
                        description="Active Products"
                        title="Active Products"
                        stats={dashboardData.overview.totalActiveProducts.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '1.75%',
                        }}
                    ></StatisticsWidget>
                </Col>
            </Row>

            <Row>
                <Col sm={6} xl={3}>
                    <StatisticsWidget
                        icon="mdi mdi-briefcase-check"
                        description="Total Services"
                        title="Services"
                        stats={dashboardData.overview.totalServices.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '3.12%',
                        }}
                    ></StatisticsWidget>
                </Col>

                <Col sm={6} xl={3}>
                    <StatisticsWidget
                        icon="mdi mdi-calendar-star"
                        description="Total Events"
                        title="Events"
                        stats={dashboardData.overview.totalEvents.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '2.45%',
                        }}
                    ></StatisticsWidget>
                </Col>

                <Col sm={6} xl={3}>
                    <StatisticsWidget
                        icon="mdi mdi-account-tie"
                        description="Total Poojaris"
                        title="Poojaris"
                        stats={dashboardData.overview.totalPoojaris.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '4.35%',
                        }}
                    ></StatisticsWidget>
                </Col>

                <Col sm={6} xl={3}>
                    <StatisticsWidget
                        icon="mdi mdi-calendar-check"
                        description="Ritual Bookings"
                        title="Rituals"
                        stats={dashboardData.overview.totalRituals.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '3.85%',
                        }}
                    ></StatisticsWidget>
                </Col>
            </Row>

            <Row>
                <Col sm={6}>
                    <StatisticsWidget
                        icon="mdi mdi-account-group"
                        description="Total Users"
                        title="Users"
                        stats={dashboardData.overview.totalUsers.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '4.87%',
                        }}
                    ></StatisticsWidget>
                </Col>

                <Col sm={6}>
                    <StatisticsWidget
                        icon="mdi mdi-domain"
                        description="Total Tenants"
                        title="Tenants"
                        stats={dashboardData.overview.totalUsers.toString()}
                        trend={{
                            textClass: 'text-success',
                            icon: 'mdi mdi-arrow-up-bold',
                            value: '1.34%',
                        }}
                    ></StatisticsWidget>
                </Col>
            </Row>
        </>
    );
};

export default Statistics;
