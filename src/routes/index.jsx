import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingScreen from '@components/LoadingScreen';

const Loader = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />} >
    <Component {...props} />
  </Suspense>
);

// // //Ecommerce Pages
const Products = Loader(lazy(() => import('@pages/Products/Products')));
const EcommerceProductDetail = Loader(lazy(() => import('@pages/Products/ProductDetail')));
const Orders = Loader(lazy(() => import('@pages/Orders/index')));
const EcommerceCustomers = Loader(lazy(() => import('@pages/Products/EcommerceCustomers/index')));
const Payments = Loader(lazy(() => import('@pages/Settings/Payments')));
const EcommerceAutoImport = Loader(lazy(() => import('@pages/Settings/AutoImport')));
const AddProduct = Loader(lazy(() => import('@pages/Products/AddProduct')));

// // Authentication related pages
const Login = Loader(lazy(() => import('@pages/Authentication/Login')));
const Logout = Loader(lazy(() => import('@pages/Authentication/Logout')));
const Register = Loader(lazy(() => import('@pages/Authentication/Register')));
const ForgetPwd = Loader(lazy(() => import('@pages/Authentication/ForgetPassword')));

const Pages404 = Loader(lazy(() => import('@pages/Utility/pages-404')));

// // Dashboard
const Dashboard = Loader(lazy(() => import('@pages/Dashboard/index')));

// //Settings
const ApiSetting = Loader(lazy(() => import('@pages/Settings/ApiSetting')));
const Wallet = Loader(lazy(() => import('@pages/Crypto/crypto-wallet')));

// Contacts
const ContactsList = Loader(lazy(() => import('@pages/Contacts/contacts-list')));

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // Product
  {
    path: "/ecommerce-product-detail/:id",
    component: <EcommerceProductDetail />,
  },
  { path: "/products", component: <Products /> },
  { path: "/orders", component: <Orders /> },
  { path: "/clients", component: <EcommerceCustomers /> },
  { path: "/payments", component: <Payments /> },
  { path: "/ecommerce-add-product", component: <AddProduct /> },
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

  { path: "/pages-404", component: <Pages404 /> },
];

export { authProtectedRoutes, publicRoutes };
