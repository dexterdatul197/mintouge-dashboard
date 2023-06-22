import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingScreen from '@components/LoadingScreen';

const Loader = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />} >
    <Component {...props} />
  </Suspense>
);

// // //Ecommerce Pages
const EcommerceProducts = Loader(lazy(() => import('@pages/Ecommerce/EcommerceProducts/index')));
const EcommerceProductDetail = Loader(lazy(() => import('@pages/Ecommerce/EcommerceProducts/EcommerceProductDetail')));
const EcommerceOrders = Loader(lazy(() => import('@pages/Ecommerce/EcommerceOrders/index')));
const EcommerceCustomers = Loader(lazy(() => import('@pages/Ecommerce/EcommerceCustomers/index')));
const EcommerceCheckout = Loader(lazy(() => import('@pages/Ecommerce/EcommerceCheckout')));
const EcommerceAutoImport = Loader(lazy(() => import('@pages/Forms/AutoImport')));
const EcommerceAddProduct = Loader(lazy(() => import('@pages/Ecommerce/EcommerceAddProduct')));

// //Email
const EmailInbox = Loader(lazy(() => import('@pages/Email/email-inbox')));

// // Authentication related pages
const Login = Loader(lazy(() => import('@pages/Authentication/Login')));
const Logout = Loader(lazy(() => import('@pages/Authentication/Logout')));
const Register = Loader(lazy(() => import('@pages/Authentication/Register')));
const ForgetPwd = Loader(lazy(() => import('@pages/Authentication/ForgetPassword')));

const PagesMaintenance = Loader(lazy(() => import('@pages/Utility/pages-maintenance')));
const Pages404 = Loader(lazy(() => import('@pages/Utility/pages-404')));

// // Dashboard
const Dashboard = Loader(lazy(() => import('@pages/Dashboard/index')));

// //Settings
const ApiSetting = Loader(lazy(() => import('@pages/Forms/ApiSetting')));
const Wallet = Loader(lazy(() => import('@pages/Crypto/CryptoWallet/crypto-wallet')));

// Contacts
const ContactsList = Loader(lazy(() => import('@pages/Contacts/ContactList/contacts-list')));

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // Product
  {
    path: "/ecommerce-product-detail/:id",
    component: <EcommerceProductDetail />,
  },
  { path: "/ecommerce-products", component: <EcommerceProducts /> },
  { path: "/ecommerce-orders", component: <EcommerceOrders /> },
  { path: "/ecommerce-customers", component: <EcommerceCustomers /> },
  { path: "/ecommerce-checkout", component: <EcommerceCheckout /> },
  { path: "/ecommerce-add-product", component: <EcommerceAddProduct /> },
  { path: "/ecommerce-auto-import", component: <EcommerceAutoImport /> },

  // Settings
  { path: "/setting-api", component: <ApiSetting /> },
  { path: "/wallet", component: <Wallet /> },

  // User Management
  { path: "/contacts-list", component: <ContactsList /> },

  //  this route should be at the end of all other routes
  //  eslint-disable-next-line react/display-name
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
