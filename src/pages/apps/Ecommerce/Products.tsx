import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import classNames from 'classnames';
import { Column } from 'react-table';
import { PageTitle, Table, CellFormatter, PageSize, Loader } from 'components';
import { Product } from './types';
import useProductDetails from './hooks/useProductDetails';
import { getProducts } from 'redux/actions';

const Products = () => {
    const { dispatch, products, loading } = useProductDetails(); // Assume totalRecords is returned by the server
    useEffect(() => {
        dispatch(getProducts({ limit: 50, page: 1, customerId: 3, sortBy: 'id' }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const columns: ReadonlyArray<Column<any>> = [
        {
            Header: 'Product',
            accessor: 'title',
            defaultCanSort: true,
            Cell: ({ row }: { row: any }) => {
                const [isLoading, setIsLoading] = useState(true);

                const handleLoad = () => {
                    setIsLoading(false);
                };

                const handleError = () => {
                    setIsLoading(false); // Stop loading even if an error occurs
                };

                return (
                    <div style={{ display: "flex", alignItems: "center" }}>
                        {/* Image container with loader */}
                        <div style={{ position: "relative", height: "48px", width: "69px", marginRight: "12px" }}>
                            {isLoading && (
                                <div
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        height: "100%",
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: "#f0f0f0", // Optional background for loader
                                        borderRadius: "4px",
                                    }}
                                >
                                    <div className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></div>
                                </div>
                            )}
                            <img
                                src={row.original.thumbnailUrl}
                                alt={row.original.title}
                                className="rounded"
                                height="48"
                                width="70"
                                onLoad={handleLoad}
                                onError={handleError}
                                style={{ display: isLoading ? "none" : "block" }} // Hide image until loaded
                            />
                        </div>
                        {/* Text and link */}
                        <p className="m-0 d-inline-block align-middle font-16">
                            <Link to="/apps/ecommerce/details" className="text-body">
                                {row.original.title}
                            </Link>
                        </p>
                    </div>
                );
            },
        },
        {
            Header: 'Category',
            accessor: 'category',
            defaultCanSort: true,
        },
        {
            Header: 'Premium',
            accessor: 'isPremium',
            defaultCanSort: true,
            Cell: ({ row }: CellFormatter<Product>) => (
                <span
                    className={classNames('badge', {
                        'text-black-100': row.original.isPremium,
                        'text-black-50': !row.original.isPremium,
                    })}>
                    {row.original.isPremium ? 'Premium' : 'Normal'}
                </span>
            ),
        },
        {
            Header: 'Price',
            accessor: 'price',
            defaultCanSort: true,
        },
        {
            Header: 'Status',
            accessor: 'isActive',
            Cell: ({ row }: CellFormatter<Product>) => (
                <span
                    className={classNames('badge', {
                        'bg-success': row.original.isActive,
                        'bg-danger': !row.original.isActive,
                    })}>
                    {row.original.isActive ? 'Active' : 'Deactivated'}
                </span>
            ),
        },
        {
            Header: 'Action',
            accessor: 'action',
            Cell: ({ row }: CellFormatter<Product>) => (
                <>
                    <Link to="#" className="action-icon">
                        <i className="mdi mdi-eye"></i>
                    </Link>
                    <Link to="#" className="action-icon">
                        <i className="mdi mdi-square-edit-outline"></i>
                    </Link>
                    <Link to="#" className="action-icon">
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
                    { label: 'eCommerce', path: '/apps/ecommerce/products' },
                    { label: 'Products', path: '/apps/ecommerce/products', active: true },
                ]}
                title={'Products'}
            />

            <Row>
                <Col xs={12}>
                    <Card>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col sm={5}>
                                    <Link to="/apps/products/addProduct" className="btn btn-danger mb-2">
                                        <i className="mdi mdi-plus-circle me-2"></i> Add Products
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
                            {loading && <Loader />
                            }
                            {products?.length > 0 ? (
                                <Table<Product>
                                    columns={columns}
                                    data={products}
                                    pageSize={10}
                                    sizePerPageList={sizePerPageList}
                                    isSortable={true}
                                    pagination={true}
                                    theadClass="table-light"
                                    searchBoxClass="mb-2"
                                />
                            ) : (
                                <p className="text-center">No products available</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default Products;
