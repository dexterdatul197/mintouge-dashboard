import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Storage } from '@/utils';

const Logout = () => {
  useEffect(() => {
    localStorage.removeItem(Storage.OptedUser);
  }, []);

  return (
    <Navigate to={{ pathname: "/login" }} />
  );
};

export default Logout;
