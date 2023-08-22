import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import LanguageDropdown from './LanguageDropdown';
import NotificationDropdown from './NotificationDropdown';
import ProfileMenu from './ProfileMenu';

const logo = 'https://cdn.mintouge.com/mini-web/assets/vaultik_wslogo.svg';
const logoLightSvg = 'https://cdn.mintouge.com/mini-web/assets/vaultik_wlogo.svg';

//i18n
import { useTranslation } from 'react-i18next';

const Header = props => {
  const [search, setsearch] = useState(false);
  const { t } = useTranslation();

  function toggleFullscreen() {
    if (
      !document.fullscreenElement &&
      /* alternative standard method */ !document.mozFullScreenElement &&
      !document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  function tToggle() {
    var body = document.body;
    if (window.screen.width <= 998) {
      body.classList.toggle("sidebar-enable");
    } else {
      body.classList.toggle("vertical-collpsed");
      body.classList.toggle("sidebar-enable");
    }
  }

  return (
    <React.Fragment>
      <header id="page-topbar">
        <div className="navbar-header">
          <div className="d-flex">

            <div className="navbar-brand-box d-lg-none d-md-block">
              <Link to="/" className="logo logo-dark">
                <span className="logo-sm">
                  <img src={logo} alt="" height="22" />
                </span>
              </Link>

              <Link to="/" className="logo logo-light">
                <span className="logo-sm">
                  <img src={logoLightSvg} alt="" height="22" />
                </span>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => {
                tToggle();
              }}
              className="btn btn-sm px-3 font-size-16 header-item "
              id="vertical-menu-btn"
            >
              <i className="bx bx-menu" />
            </button>

            <form className="app-search d-none d-lg-block">
              <div className="position-relative">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("Search") + "..."}
                />
                <span className="bx bx-search-alt" />
              </div>
            </form>

          </div>
          <div className="d-flex">
            <div className="dropdown d-inline-block d-lg-none ms-2">
              <button
                onClick={() => {
                  setsearch(!search);
                }}
                type="button"
                className="btn header-item noti-icon "
                id="page-header-search-dropdown"
              >
                <i className="mdi mdi-magnify" />
              </button>
              <div
                className={
                  search
                    ? "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 show"
                    : "dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                }
                aria-labelledby="page-header-search-dropdown"
              >
                <form className="p-3">
                  <div className="form-group m-0">
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search ..."
                        aria-label="Recipient's username"
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">
                          <i className="mdi mdi-magnify" />
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <LanguageDropdown />

            <div className="dropdown d-none d-lg-inline-block ms-1">
              <button
                type="button"
                onClick={() => {
                  toggleFullscreen();
                }}
                className="btn header-item noti-icon "
                data-toggle="fullscreen"
              >
                <i className="bx bx-fullscreen" />
              </button>
            </div>

            <NotificationDropdown />
            <ProfileMenu />
            
            <div className="dropdown d-inline-block">
              <button
                type="button"
                className="btn header-item noti-icon right-bar-toggle "
              >
                <i className="bx bx-cog bx-spin" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

Header.propTypes = {
};

export default Header;
