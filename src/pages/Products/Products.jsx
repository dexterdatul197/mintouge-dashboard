import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

import Table from '@/components/Table';
import { ProductHeaders } from '@/utils';
import LoadingScreen from '@/components/LoadingScreen';
import { useProducts } from '@/store/productStore';

const Orders = () => {
  document.title = "Products | Vaultik - Brands Dashboard";
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  // const [isLoading, setLoading] = useState(false);
  const { isLoading, fetchProducts, products: productList } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = () => {
    navigate("/products/add-product");
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="page-content">
      <Container fluid>
        <div className="page-title-container mb-4">
          <div className="me-2">
            <h3 className="">Products</h3>
          </div>
          {/* <input
            className="orders-search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
          /> */}
          <Button color="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </div>

        <div className="table-responsive border-1 p-2">
          <Table headers={ProductHeaders} data={productList} />
        </div>
      </Container>
    </div>
  )
}

export default Orders;
