import { Card, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { DashboardData } from './types';

const Poojaris = ({ dashboardData }: { dashboardData: DashboardData }) => {
    // Get top poojaris from dashboard data
    const topPoojaris = dashboardData?.recentActivity?.topPoojaris || [];

    return (
        <Card>
            <Card.Body>
                <Link to="#" className="float-end">
                    Export <i className="mdi mdi-download ms-1"></i>
                </Link>

                <h4 className="header-title mt-2 mb-3">Top Poojaris</h4>
                <Table hover responsive className="mb-0">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Rating</th>
                            <th>Experience</th>
                            <th>Poojas Done</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topPoojaris.map((poojari) => (
                            <tr key={poojari.id}>
                                <td>
                                    <h5 className="font-14 my-1 fw-normal">{poojari.name}</h5>
                                    <span className="text-muted font-13">
                                        {poojari.languages.join(", ")}
                                    </span>
                                </td>
                                <td>
                                    <h5 className="font-14 my-1 fw-normal">{poojari.rating}</h5>
                                    <span className="text-muted font-13">Rating</span>
                                </td>
                                <td>
                                    <h5 className="font-14 my-1 fw-normal">{poojari.experience} years</h5>
                                    <span className="text-muted font-13">Experience</span>
                                </td>
                                <td>
                                    <h5 className="font-14 my-1 fw-normal">{poojari.poojasDone}</h5>
                                    <span className="text-muted font-13">Poojas Done</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
};

export default Poojaris;
