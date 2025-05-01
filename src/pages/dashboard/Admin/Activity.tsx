import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { CardTitle, Timeline, TimelineItem } from 'components';
import { DashboardData } from './types';
import { formatDistanceToNow } from 'date-fns';

const Activity = ({ dashboardData }: { dashboardData: DashboardData }) => {
    // Get the recent activity data
    const recentOrders = dashboardData.recentActivity?.recentOrders || [];
    const recentPoojaris = dashboardData.recentActivity?.recentPoojaris || [];
    const recentCustomers = dashboardData.recentActivity?.recentCustomers || [];

    const hasAnyActivity = recentOrders.length > 0 ||
        recentPoojaris.length > 0 ||
        recentCustomers.length > 0;

    return (
        <Card>
            <Card.Body className="pb-0">
                <CardTitle
                    containerClass="d-flex align-items-center justify-content-between mb-2"
                    title="Recent Activity"
                    menuItems={[
                        { label: 'Sales Report' },
                        { label: 'Export Report' },
                        { label: 'Profit' },
                        { label: 'Action' },
                    ]}
                />
            </Card.Body>
            <SimpleBar style={{ maxHeight: '412px', width: '100%' }}>
                <Card.Body className="py-0">
                    <Timeline>
                        {hasAnyActivity ? (
                            <>
                                {recentOrders.map((order) => (
                                    <TimelineItem key={`order-${order.id}`}>
                                        <i className="mdi mdi-account-plus bg-info-lighten text-info timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-info fw-bold mb-1 d-block">
                                                {order.firstname} {order.lastname}
                                            </Link>
                                            <small>
                                                New user registered with email <span className="fw-bold">{order.email}</span>
                                            </small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted">
                                                    {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                                                </small>
                                            </p>
                                        </div>
                                    </TimelineItem>
                                ))}
                                {/* 
                                {recentPoojaris.map((booking) => (
                                    <TimelineItem key={`booking-${booking.id}`}>
                                        <i className="mdi mdi-calendar bg-primary-lighten text-primary timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-primary fw-bold mb-1 d-block">
                                                New Ritual Booking
                                            </Link>
                                            <small>
                                                New ritual booking created
                                            </small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted">
                                                    {booking. && formatDistanceToNow(new Date(booking.createdAt), { addSuffix: true })}
                                                </small>
                                            </p>
                                        </div>
                                    </TimelineItem>
                                ))} */}

                                {recentCustomers.map((customer) => (
                                    <TimelineItem key={`customer-${customer.id}`}>
                                        <i className="mdi mdi-account bg-success-lighten text-success timeline-icon"></i>
                                        <div className="timeline-item-info">
                                            <Link to="#" className="text-success fw-bold mb-1 d-block">
                                                {customer.firstname} {customer.lastname}
                                            </Link>
                                            <small>
                                                New customer added
                                            </small>
                                            <p className="mb-0 pb-2">
                                                <small className="text-muted">
                                                    {customer.createdAt && formatDistanceToNow(new Date(customer.createdAt), { addSuffix: true })}
                                                </small>
                                            </p>
                                        </div>
                                    </TimelineItem>
                                ))}
                            </>
                        ) : (
                            <TimelineItem>
                                <i className="mdi mdi-information bg-info-lighten text-info timeline-icon"></i>
                                <div className="timeline-item-info">
                                    <span className="text-info fw-bold mb-1 d-block">No recent activity</span>
                                    <small>There is no activity to display at this time.</small>
                                </div>
                            </TimelineItem>
                        )}
                    </Timeline>
                </Card.Body>
            </SimpleBar>
        </Card>
    );
};

export default Activity;
