import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const history = useNavigate();

  useEffect(() => {
    // // dispatch(logoutUser(history));
  }, [history]);

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default Logout;
