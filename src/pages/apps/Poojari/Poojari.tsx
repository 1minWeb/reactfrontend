import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Column } from 'react-table';
import { PageTitle, Table, CellFormatter, PageSize, Loader } from 'components';
import { IPoojari } from './types';
import usePoojariDetails from './hooks/usePoojariDetails';
import { getPoojaris } from 'redux/poojari/actions';

const Poojaris = () => {
    const { dispatch, poojaris, loading, error, handleDeleteAction, totalRecords } = usePoojariDetails();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deletePoojariId, setDeletePoojariId] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState('id');
    const [sortType, setSortType] = useState('desc');

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const handleSortChange = (column: string, order: string) => {
        setSortBy(column);
        setSortType(order);
        setCurrentPage(1);
    };

    const confirmDelete = () => {
        if (deletePoojariId) {
            handleDeleteAction(deletePoojariId);
            setDeletePoojariId(null);
        }
    };

    useEffect(() => {
        dispatch(getPoojaris({
            limit: pageSize,
            page: currentPage,
            sortBy: sortBy,
            sortType: sortType
        }));
    }, [dispatch, pageSize, currentPage, sortBy, sortType]);

    const columns: ReadonlyArray<Column<any>> = [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ row }: CellFormatter<IPoojari>) => (
                <Link to={`/apps/poojari/edit/${row.original.id}`} className="text-body">
                    {row.original.name}
                </Link>
            ),
            defaultCanSort: true,
        },
        {
            Header: 'Location',
            accessor: 'location',
            defaultCanSort: true,
        },
        {
            Header: 'Experience (yrs)',
            accessor: 'experience',
            defaultCanSort: true,
        },
        {
            Header: 'Rating',
            accessor: 'rating',
            defaultCanSort: true,
        },
        {
            Header: 'Available',
            accessor: 'isAvailable',
            Cell: ({ row }: CellFormatter<IPoojari>) => (
                <span>{row.original.isAvailable ? 'Yes' : 'No'}</span>
            ),
            defaultCanSort: true,
        },
        {
            Header: 'Verified',
            accessor: 'isVerified',
            Cell: ({ row }: CellFormatter<IPoojari>) => (
                <span>{row.original.isVerified ? 'Yes' : 'No'}</span>
            ),
            defaultCanSort: true,
        },
        {
            Header: 'Action',
            accessor: 'action',
            defaultCanSort: false,
            Cell: ({ row }: CellFormatter<IPoojari>) => (
                <>
                    <Link to={`/apps/poojari/edit/${row.original.id}`} className="action-icon">
                        <i className="mdi mdi-eye"></i>
                    </Link>
                    <Link to={`/apps/poojari/edit/${row.original.id}`} className="action-icon">
                        <i className="mdi mdi-square-edit-outline"></i>
                    </Link >
                    <Link
                        to="#"
                        className="action-icon"
                        onClick={(e: any) => {
                            e.preventDefault();
                            setDeletePoojariId(row.original.id as number);
                        }}
                    >
                        <i className="mdi mdi-delete"></i>
                    </Link>
                </>
            ),
        },
    ];

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Poojaris', path: '/apps/poojari' },
                    { label: 'Poojari List', path: '/apps/poojari', active: true },
                ]}
                title={'Poojaris'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link id="0" to={`/apps/poojari/edit/0`} className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Poojari
                                    </Link>
                                </Col>
                                <Col sm={7}>
                                    <div className="text-sm-end">
                                        <Button variant="light" className="mb-2 me-1">Import</Button>
                                        <Button variant="light" className="mb-2">Export</Button>
                                    </div>
                                </Col>
                            </Row>
                            {loading && <Loader />}
                            {poojaris?.length > 0 ? (
                                <Table<IPoojari>
                                    columns={columns}
                                    data={poojaris}
                                    isSortable={true}
                                    theadClass="table-light"
                                    searchBoxClass="mb-2"
                                    isSearchable={true}
                                />
                            ) : (
                                <p className="text-center">No Poojaris available</p>
                            )}
                            <div className="d-flex justify-content-between align-items-center mt-3">
                                <div>
                                    Showing {(currentPage - 1) * pageSize + 1} -{' '}
                                    {Math.min(currentPage * pageSize, totalRecords)} of {totalRecords}
                                </div>

                                <div className="d-flex align-items-center">
                                    <label className="me-2">Rows per page:</label>
                                    <select
                                        value={pageSize}
                                        onChange={(e) => handleSizeChange(Number(e.target.value))}
                                        className="form-select form-select-sm w-auto"
                                    >
                                        {[5, 10, 50, 100].map(size => (
                                            <option key={size} value={size}>{size}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <Button
                                        variant="light"
                                        className="me-1"
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    // disabled={currentPage === 1}
                                    >
                                        Previous
                                    </Button>
                                    <span>Page {currentPage}</span>
                                    <Button
                                        variant="light"
                                        className="ms-1"
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    // disabled={currentPage * pageSize >= totalRecords}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </div>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Modal show={!!deletePoojariId} onHide={() => setDeletePoojariId(null)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this poojari?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                    <Button variant="secondary" onClick={() => setDeletePoojariId(null)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Poojaris;
