import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Column } from 'react-table';
import { PageTitle, Table, CellFormatter, PageSize } from 'components';
import { IService } from './types';
import useServiceDetails from './hooks/useServiceDetails';
import { getServices } from 'redux/services/actions';

const Services = () => {
    const { dispatch, services, loading, error, handleDeleteAction } = useServiceDetails(); // Assume totalRecords is returned by the server

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deleteServiceId, setDeleteServiceId] = useState<number | null>(null);
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1); // Reset to the first page when page size changes
    };
    const confirmDelete = () => {
        if (deleteServiceId) {
            handleDeleteAction(deleteServiceId);
            setDeleteServiceId(null);
        }
    };
    // Fetch services based on the current page and page size
    useEffect(() => {
        dispatch(getServices({ limit: pageSize, page: currentPage, tenantId: 'tenant1' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, pageSize, currentPage]);

    const columns: ReadonlyArray<Column<any>> = [
        {
            Header: 'Service',
            accessor: 'name',
            defaultCanSort: true,
            Cell: ({ row }: CellFormatter<any>) => (
                <>
                    {/* <img
                        src={row.original.imageUrl}
                        alt={row.original.name}
                        className="rounded me-3"
                        height="48"
                    /> */}
                    <p className="m-0 d-inline-block align-middle font-16">
                        <Link to={`/apps/services/details/${row.original.id}`} className="text-body">
                            {row.original.name}
                        </Link>
                    </p>
                </>
            ),
        },
        {
            Header: 'Description',
            accessor: 'description',
            defaultCanSort: true,
        },
        {
            Header: 'Price',
            accessor: 'price',
            defaultCanSort: true,
        },
        {
            Header: 'Discount',
            accessor: 'discount',
            defaultCanSort: true,
        },
        {
            Header: 'Reviews',
            accessor: 'reviews',
            defaultCanSort: true,
        },
        {
            Header: 'Rating',
            accessor: 'rating',
            defaultCanSort: true,
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }: CellFormatter<IService>) => (
                <>
                    <Link to={`/apps/services/addService/${row.original.id}`} className="action-icon">
                        <i className="mdi mdi-eye"></i>
                    </Link>
                    <Link to={`/apps/services/addService/${row.original.id}`} className="action-icon">
                        <i className="mdi mdi-square-edit-outline"></i>
                    </Link>
                    <Link
                        to="#"
                        className="action-icon"
                        onClick={(event: React.MouseEvent) => {
                            event.preventDefault();
                            setDeleteServiceId(row.original.id ?? null);
                        }}>
                        <i className="mdi mdi-delete"></i>
                    </Link>
                </>
            ),
        },
    ];

    const sizePerPageList: PageSize[] = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '20', value: 20 },
    ];

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Services', path: '/apps/services' },
                    { label: 'Service List', path: '/apps/services', active: true },
                ]}
                title={'Services'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link id="0" to={`/apps/services/addService/0`} className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Service
                                    </Link>
                                </Col>

                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Button variant="success" className="mb-2 me-1">
                                            <i className="mdi mdi-cog-outline"></i>
                                        </Button>

                                        <Button variant="light" className="mb-2 me-1">
                                            Import
                                        </Button>

                                        <Button variant="light" className="mb-2">
                                            Export
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                            {services?.length > 0 ? (
                                <Table<IService>
                                    columns={columns}
                                    data={services}
                                    pageSize={10}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    theadClass="table-light"
                                    searchBoxClass="mb-2"
                                />
                            ) : (
                                <p className="text-center">No services available</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={!!deleteServiceId} onHide={() => setDeleteServiceId(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this service?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDelete}>
                        Delete
                    </Button>
                    <Button variant="secondary" onClick={() => setDeleteServiceId(null)}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Services;
