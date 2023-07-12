import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card,
  CardBody,
  Col,
  Container,
  Form,
  Input,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from 'reactstrap';
import classnames from 'classnames';
import { isEmpty, map } from 'lodash';
import StarRatings from 'react-star-ratings';

import { ProductApi } from '@/api';
import { productImages } from '@assets/images';
import Breadcrumbs from '@components/Breadcrumb';
import { productsData } from '@common/data';

const ProductsContainer = (props) => {
  document.title = "Products | Mintouge - Brands Dashboard";

  const navigate = useNavigate();
  const products = productsData;

  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(5);
  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    const fetchProducts = async () => {
      const _data = await ProductApi.getProducts(page);
      console.log("FetchProducts:", _data);
      
      setProductList(products);
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const handlePageClick = (page) => {
    setPage(page);
  };

  // const ProductItem = () => (

  // );

  const ProductsBody = () => (
    <Row>
      {!isEmpty(productList) &&
        productList.map((product, key) => (
          <Col xl="4" sm="6" key={"_col_" + key}>
            <Card
              onClick={() =>
                navigate(`/ecommerce-product-detail/${product.id}`)
              }
            >
              <CardBody>
                <div className="product-img position-relative">
                  {product.isOffer ? (
                    <div className="avatar-sm product-ribbon">
                      <span className="avatar-title rounded-circle bg-primary">
                        {`- ${product.offer} %`}
                      </span>
                    </div>
                  ) : null}

                  <img
                    src={productImages[product.image]}
                    alt=""
                    className="img-fluid mx-auto d-block"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h5 className="mb-3 text-truncate">
                    <Link
                      to={"/ecommerce-product-detail/" + product.id}
                      className="text-dark"
                    >
                      {product.name}{" "}
                    </Link>
                  </h5>
                  <div className="text-muted mb-3">
                    <StarRatings
                      rating={product.rating}
                      starRatedColor="#F1B44C"
                      starEmptyColor="#74788d"
                      numberOfStars={5}
                      name="rating"
                      starDimension="14px"
                      starSpacing="1px"
                    />
                  </div>
                  <h5 className="my-0">
                    <span className="text-muted me-2">
                      <del>${product.oldPrice}</del>
                    </span>
                    <b>${product.newPrice}</b>
                  </h5>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
    </Row>
  );

  const PaginationBody = () => {
    <Row>
      <Col lg="12">
        <Pagination className="pagination pagination-rounded justify-content-center mt-3 mb-4 pb-1">
          <PaginationItem disabled={page === 1}>
            <PaginationLink
              previous
              href="#"
              onClick={() => handlePageClick(page - 1)}
            />
          </PaginationItem>
          {map(Array(totalPage), (item, i) => (
            <PaginationItem active={i + 1 === page} key={i}>
              <PaginationLink
                onClick={() => handlePageClick(i + 1)}
                href="#"
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem disabled={page === totalPage}>
            <PaginationLink
              next
              href="#"
              onClick={() => handlePageClick(page + 1)}
            />
          </PaginationItem>
        </Pagination>
      </Col>
    </Row>
  };

  const SearchBar = () => (
    <Row className="mb-3">
      <Col lg="12" sm="6">
        <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
          <div className="search-box me-2">
            <div className="position-relative">
              <Input
                type="text"
                className="form-control border-0"
                placeholder="Search..."
              />
              <i className="bx bx-search-alt search-icon" />
            </div>
          </div>
          <Nav className="product-view-nav" pills>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "1",
                })}
                onClick={() => {
                  toggleTab("1");
                }}
              >
                <i className="bx bx-grid-alt" />
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: activeTab === "2",
                })}
                onClick={() => {
                  toggleTab("2");
                }}
              >
                <i className="bx bx-list-ul" />
              </NavLink>
            </NavItem>
          </Nav>
        </Form>
      </Col>
    </Row>
  );

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ecommerce" breadcrumbItem="Products" />
          <Row>
            <Col lg="12">
              <SearchBar />
              <ProductsBody />
              <PaginationBody />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

ProductsContainer.propTypes = {
  products: PropTypes.array,
  history: PropTypes.object,
  onGetProducts: PropTypes.func,
};

export default ProductsContainer;
