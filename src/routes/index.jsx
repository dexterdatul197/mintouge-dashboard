import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

// // //Ecommerce Pages
const EcommerceProducts = lazy(() => import('@pages/Ecommerce/EcommerceProducts/index'));
const EcommerceProductDetail = lazy(() => import('@pages/Ecommerce/EcommerceProducts/EcommerceProductDetail'));
const EcommerceOrders = lazy(() => import('@pages/Ecommerce/EcommerceOrders/index'));
const EcommerceCustomers = lazy(() => import('@pages/Ecommerce/EcommerceCustomers/index'));
const EcommerceCheckout = lazy(() => import('@pages/Ecommerce/EcommerceCheckout'));
const EcommerceAutoconst = lazy(() => import('@pages/Forms/Autoconst'));
const EcommerceAddProduct = lazy(() => import('@pages/Ecommerce/EcommerceAddProduct'));

// //Email
const EmailInbox = lazy(() => import('@pages/Email/email-inbox'));

// // Authentication related pages
const Login = lazy(() => import('@pages/Authentication/Login'));
const Logout = lazy(() => import('@pages/Authentication/Logout'));
const Register = lazy(() => import('@pages/Authentication/Register'));
const ForgetPwd = lazy(() => import('@pages/Authentication/ForgetPassword'));

const PagesMaintenance = lazy(() => import('@pages/Utility/pages-maintenance'));
const PagesComingsoon = lazy(() => import('@pages/Utility/pages-comingsoon'));
const Pages404 = lazy(() => import('@pages/Utility/pages-404'));
const Pages500 = lazy(() => import('@pages/Utility/pages-500'));

// // Dashboard
const Dashboard = lazy(() => import('@pages/Dashboard/index'));

// //Settings
const ApiSetting = lazy(() => import('@pages/Forms/ApiSetting'));
const Wallet = lazy(() => import('@pages/Crypto/CryptoWallet/crypto-wallet'));


// //Contacts
const ContactsGrid = lazy(() => import('@pages/Contacts/contacts-grid'));
const ContactsList = lazy(() => import('@pages/Contacts/ContactList/contacts-list'));
const ContactsProfile = lazy(() => import('@pages/Contacts/ContactsProfile/contacts-profile'));

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  //   //Product
  {
    path: "/ecommerce-product-detail/:id",
    component: <EcommerceProductDetail />,
  },
  { path: "/ecommerce-products", component: <EcommerceProducts /> },
  { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/ecommerce-add-product", component: <EcommerceAddProduct /> },
  { path: "/ecommerce-auto-const", component: <EcommerceAutoconst /> },

  //   //Settings
  { path: "/setting-api", component: <ApiSetting /> },
  { path: "/wallet", component: <Wallet /> },

  //   //Notifications
  { path: "/email-inbox", component: <EmailInbox /> },

  // User Management
  { path: "/contacts-grid", component: <ContactsGrid /> },
  { path: "/contacts-list", component: <ContactsList /> },
  { path: "/contacts-profile", component: <ContactsProfile /> },

  //   // this route should be at the end of all other routes
  //   // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: <Navigate to="/dashboard" /> },
];

const publicRoutes = [
  { path: "/logout", component: <Logout /> },
  { path: "/login", component: <Login /> },
  { path: "/forgot-password", component: <ForgetPwd /> },
  { path: "/register", component: <Register /> },

  { path: "/pages-maintenance", component: <PagesMaintenance /> },
  { path: "/pages-comingsoon", component: <PagesComingsoon /> },
  { path: "/pages-404", component: <Pages404 /> },
  { path: "/pages-500", component: <Pages500 /> },
];

export { authProtectedRoutes, publicRoutes };
