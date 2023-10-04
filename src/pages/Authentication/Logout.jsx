import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Storage } from '@/utils';
import { useProducts } from '@/store/productStore';

const Logout = () => {
  const { setProducts } = useProducts(false);
  useEffect(() => {
    setProducts([]);
    localStorage.removeItem(Storage.OptedUser);
  }, []);

  return (
    <Navigate to={{ pathname: "/login" }} />
  );
};

export default Logout;
