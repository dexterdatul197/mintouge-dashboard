import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem("accessToken");
  }, []);

  return (
    <Navigate to={{ pathname: "/login" }} />
  );
};

export default Logout;
