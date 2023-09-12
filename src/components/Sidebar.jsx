import PropTypes from 'prop-types';
import React from 'react';

//i18n
import SidebarContent from './SidebarContent';

import { Link } from 'react-router-dom';
const logo = 'https://cdn.vaultik.com/mini-web/assets/vaultik_slogo.svg';
const logoDark = 'https://cdn.vaultik.com/mini-web/assets/vaultik_logo.svg';
const logoLightPng = 'https://cdn.vaultik.com/mini-web/assets/vaultik_wlogo.svg';
const logoLightSvg = 'https://cdn.vaultik.com/mini-web/assets/vaultik_wslogo.svg';

const Sidebar = (props) => {
  return (
    <React.Fragment>
      <div className="vertical-menu">
        <div className="navbar-brand-box">
          <Link to="/" className="logo logo-dark">
            <span className="logo-sm">
              <img src={logo} className="mx-2" alt="" height="30" />
            </span>
            <span className="logo-lg">
              <img src={logoDark} alt="" height="30" />
            </span>
          </Link>

          <Link to="/" className="logo logo-light">
            <span className="logo-sm">
              <img src={logoLightSvg} className="mx-2" alt="" height="30" />
            </span>
            <span className="logo-lg">
              <img src={logoLightPng} alt="" height="35" />
            </span>
          </Link>
        </div>

        <div className="d-flex h-100 flex-column justify-content-between align-items-center">
          <SidebarContent />

          <Link
            style={{
              borderRadius: "5px",
              padding: "10px 20px",
              marginBottom: "20px",
              color: "var(--bs-white)",
              backgroundColor: "var(--bs-primary)",
            }}
            to="mailto:support@vaultik.com" target="_blank"
          >
            Support
          </Link>
        </div>

      </div>
    </React.Fragment>
  );
};

Sidebar.propTypes = {
  type: PropTypes.string,
};

export default Sidebar;
