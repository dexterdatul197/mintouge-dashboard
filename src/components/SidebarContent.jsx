import PropTypes from 'prop-types';
import MetisMenu from 'metismenujs';
import SimpleBar from 'simplebar-react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useRef, useCallback } from 'react';

/**
 * A Menu Group component, which will have menu items inside.
 * 
 * @param {string} title A caption of the menu with i18n
 * @param {string} to A link to be redirected when click
 * @param {string} icon A menu icon
 * @param {string} hasArrow A flag if it has sub menu items
 * @param {string} children A set of child components
 */
const MenuGroup = ({ to, hasArrow, icon, title, children }) => (
  <li>
    <Link to={to} className={hasArrow ? "has-arrow" : ""}>
      <i className={"bx " + icon}></i>
      <span>{title}</span>
    </Link>

    {hasArrow &&
      <ul className="sub-menu" aria-expanded="true">
        {children}
      </ul>
    }
  </li>
)

const MenuItem = (props) => (
  <li>
    <Link to={props.to}>
      {props.title}
    </Link>
  </li>

)
const SidebarContent = () => {
  const ref = useRef();
  const path = useLocation();
  const { t } = useTranslation();

  const activateParentDropdown = useCallback((aTagItem) => {
    aTagItem.classList.add("active");
    const liTagParent = aTagItem.parentElement;
    const parent2El = liTagParent.childNodes[1];
    if (parent2El && parent2El.id !== "side-menu") {
      parent2El.classList.add("mm-show");
    }

    if (liTagParent) {
      liTagParent.classList.add("mm-active");
      const ulSubMenu = liTagParent.parentElement;

      if (ulSubMenu) {
        ulSubMenu.classList.add("mm-show"); // ul tag

        const parent3 = ulSubMenu.parentElement; // li tag

        if (parent3) {
          parent3.classList.add("mm-active"); // li
          parent3.childNodes[0].classList.add("mm-active"); //a
          const sideMenu = parent3.parentElement; // ul
          if (sideMenu) {
            sideMenu.classList.add("mm-show"); // ul
            const sidebarMenu = sideMenu.parentElement;
            if (sidebarMenu) {
              sidebarMenu.classList.add("mm-show"); // li
              sidebarMenu.childNodes[0].classList.add("mm-active"); // a tag
            }
          }
        }
      }
      scrollElement(aTagItem);
      return false;
    }
    scrollElement(aTagItem);
    return false;
  }, []);

  const removeActivation = (items) => {
    for (var i = 0; i < items.length; ++i) {
      var item = items[i];
      const liTagParent = items[i].parentElement;

      if (item && item.classList.contains("active")) {
        item.classList.remove("active");
      }
      if (liTagParent) {
        const parent2El =
          liTagParent.childNodes && liTagParent.childNodes.lenght && liTagParent.childNodes[1]
            ? liTagParent.childNodes[1]
            : null;
        if (parent2El && parent2El.id !== "side-menu") {
          parent2El.classList.remove("mm-show");
        }

        liTagParent.classList.remove("mm-active");
        const ulSubMenu = liTagParent.parentElement;

        if (ulSubMenu) {
          ulSubMenu.classList.remove("mm-show");

          const parent3 = ulSubMenu.parentElement;
          if (parent3) {
            parent3.classList.remove("mm-active"); // li
            parent3.childNodes[0].classList.remove("mm-active");

            const sideMenu = parent3.parentElement; // ul
            if (sideMenu) {
              sideMenu.classList.remove("mm-show"); // ul
              const sidebarMenu = sideMenu.parentElement;
              if (sidebarMenu) {
                sidebarMenu.classList.remove("mm-show"); // li
                sidebarMenu.childNodes[0].classList.remove("mm-active"); // a tag
              }
            }
          }
        }
      }
    }
  };

  const activeMenu = useCallback(() => {
    const pathName = path.pathname;
    let matchingMenuItem = null;
    const ul = document.getElementById("side-menu");
    const items = ul.getElementsByTagName("a");
    removeActivation(items);

    for (let i = 0; i < items.length; ++i) {
      if (pathName === items[i].pathname) {
        matchingMenuItem = items[i];
        break;
      }
    }
    if (matchingMenuItem) {
      activateParentDropdown(matchingMenuItem);
    }
  }, [path.pathname, activateParentDropdown]);

  useEffect(() => {
    ref.current.recalculate();
  }, []);

  useEffect(() => {
    new MetisMenu("#side-menu");
    activeMenu();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    activeMenu();
  }, [activeMenu]);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  return (
    <React.Fragment>
      <SimpleBar className="h-100" ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <MenuGroup to="/dashboard" title={t("Dashboards")} icon="bx-home-circle" />
            <MenuGroup to="/orders" title={t("Orders")} icon="bx-cart" />
            <MenuGroup to="/products" title={t("Products")} icon="bx-store" />
            <MenuGroup to="/rewards" title={t("Perks & Rewards")} icon="bx-award" />
            <MenuGroup to="/clients" title={t("Clients")} icon="bx-male" />
            <MenuGroup to="/setting-api" title={t("Settings")} icon="bx-cog" />
            <MenuGroup to="/payments" title={t("Payments")} icon="bx-money" />

            {/* <MenuGroup to="/#" hasArrow={true} title={t("Others")} icon="bx-store">
              <MenuItem to="/products" title={t("Products")} />
              <MenuItem to="/ecommerce-product-detail/1" title={t("Product Detail")} />
              <MenuItem to="/ecommerce-add-product" title={t("Add Product")} />
              <MenuItem to="/ecommerce-auto-import" title={t("Auto Import")} />
              <MenuItem to="/orders" title={t("Orders")} />
              <MenuItem to="/clients" title={t("Customers")} />
            </MenuGroup> */}
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default SidebarContent;
