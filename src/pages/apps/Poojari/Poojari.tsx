import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button, Modal } from 'react-bootstrap';
import { Column } from 'react-table';
import { PageTitle, Table, CellFormatter, PageSize, Loader } from 'components';
import { IPoojari } from './types';
import usePoojariDetails from './hooks/usePoojariDetails';
import { getPoojaris } from 'redux/poojari/actions';

const Poojaris = () => {
    const { dispatch, poojaris, loading, error, handleDeleteAction } = usePoojariDetails();

    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [deletePoojariId, setDeletePoojariId] = useState<number | null>(null);

    const handlePageChange = (page: number) => setCurrentPage(page);
    const handleSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    };

    const confirmDelete = () => {
        if (deletePoojariId) {
            handleDeleteAction(deletePoojariId);
            setDeletePoojariId(null);
        }
    };

    useEffect(() => {
        dispatch(getPoojaris({ limit: pageSize, page: currentPage }));
    }, [dispatch, pageSize, currentPage]);

    const columns: ReadonlyArray<Column<any>> = [
        {
            Header: 'Name',
            accessor: 'name',
            Cell: ({ row }: CellFormatter<IPoojari>) => (
                <Link to={`/apps/poojaris/details/${row.original.id}`} className="text-body">
                    {row.original.name}
                </Link>
            ),
        },
        {
            Header: 'Location',
            accessor: 'location',
        },
        {
            Header: 'Experience (yrs)',
            accessor: 'experience',
        },
        {
            Header: 'Rating',
            accessor: 'rating',
        },
        {
            Header: 'Available',
            accessor: 'isAvailable',
            Cell: ({ row }: CellFormatter<IPoojari>) => (
                <span>{row.original.isAvailable ? 'Yes' : 'No'}</span>
            ),
        },
        {
            Header: 'Verified',
            accessor: 'isVerified',
            Cell: ({ row }: CellFormatter<IPoojari>) => (
                <span>{row.original.isVerified ? 'Yes' : 'No'}</span>
            ),
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }: CellFormatter<IPoojari>) => (
                <>
                    <Link to={`/apps/poojari/edit/${row.original.id}`} className="action-icon">
                        <i className="mdi mdi-eye"></i>
                    </Link>
                    <Link to={`/apps/poojari/edit/${row.original.id}`} className="action-icon">
                        <i className="mdi mdi-square-edit-outline"></i>
                    </Link>
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

    const sizePerPageList: PageSize[] = [
        { text: '5', value: 5 },
        { text: '10', value: 10 },
        { text: '20', value: 20 },
    ];

    return (
        <>
            <PageTitle
                breadCrumbItems={[
                    { label: 'Poojaris', path: '/apps/poojaris' },
                    { label: 'Poojari List', path: '/apps/poojaris', active: true },
                ]}
                title={'Poojaris'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link id="0" to={`/apps/poojaris/add/0`} className="btn btn-danger mb-2">
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
                                    pageSize={pageSize}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    theadClass="table-light"
                                    searchBoxClass="mb-2"
                                />
                            ) : (
                                <p className="text-center">No Poojaris available</p>
                            )}
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
