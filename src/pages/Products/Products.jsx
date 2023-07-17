import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'reactstrap';

import { ProductApi } from '@/api';
import Table from '@/components/Table';
import useToast from '@/utils/useToast';
import { ProductHeaders } from '@/utils';
import LoadingScreen from '@/components/LoadingScreen';

const Orders = () => {
  document.title = "Products | Mintouge - Brands Dashboard";
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(5);
  const [productList, setProductList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const _data = await ProductApi.getProducts(page);

        setProductList(_data.data);
        setLoading(false);
      } catch (error) {
        showToast(error.toString(), "error");
        setInvalid(true);
        setLoading(false);
      }
    }

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
