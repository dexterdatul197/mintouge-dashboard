import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

// Layout Related Components
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = (props) => {

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  //hides right sidebar on body click
  const hideRightbar = (event) => {
    var rightbar = document.getElementById("right-bar");
    //if clicked in inside right bar, then do nothing
    if (rightbar && rightbar.contains(event.target)) {
      return;
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", hideRightbar, true)
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <React.Fragment>
      <div id="layout-wrapper">
        <Header toggleMenuCallback={() => { }} />
        <Sidebar
          theme={undefined}
          type={undefined}
          isMobile={isMobile}
        />
        <div className="main-content">
          {props.children}
        </div>
      </div>
    </React.Fragment>
  );
};

Layout.propTypes = {
  changeLayoutWidth: PropTypes.func,
  changeSidebarTheme: PropTypes.func,
  changeSidebarThemeImage: PropTypes.func,
  changeSidebarType: PropTypes.func,
  changeTopbarTheme: PropTypes.func,
  // children: PropTypes.object,
  isPreloader: PropTypes.any,
  layoutWidth: PropTypes.any,
  leftSideBarTheme: PropTypes.any,
  leftSideBarThemeImage: PropTypes.any,
  leftSideBarType: PropTypes.any,
  location: PropTypes.object,
  topbarTheme: PropTypes.any,
};

export default Layout;
