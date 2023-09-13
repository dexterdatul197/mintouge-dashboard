import React, { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import LoadingScreen from '@components/LoadingScreen';

const Loader = (Component) => (props) => (
  <Suspense fallback={<LoadingScreen />} >
    <Component {...props} />
  </Suspense>
);

// //Product Pages
const Products = Loader(lazy(() => import('@pages/Products/Products')));
const ProductDetail = Loader(lazy(() => import('@pages/Products/ProductDetail')));
const Orders = Loader(lazy(() => import('@pages/Orders/index')));
const Clients = Loader(lazy(() => import('@pages/Clients/index')));
const Payments = Loader(lazy(() => import('@pages/Settings/Payments')));
const EcommerceAutoImport = Loader(lazy(() => import('@pages/Settings/AutoImport')));
const Rewards = Loader(lazy(() => import('@pages/Rewards/Rewards')));
const RewardDetail = Loader(lazy(() => import('@pages/Rewards/RewardDetail')));

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
const Profile = Loader(lazy(() => import('@pages/Settings/Profile')));

const authProtectedRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // Product
  { path: "/products", component: <Products /> },
  { path: "/products/:id", component: <ProductDetail /> },
  { path: "/products/add-product", component: <ProductDetail /> },
  { path: "/orders", component: <Orders /> },
  { path: "/clients", component: <Clients /> },
  { path: "/payments", component: <Payments /> },
  { path: "/auto-import", component: <EcommerceAutoImport /> },
  { path: "/rewards", component: <Rewards /> },
  { path: "/rewards/:id", component: <RewardDetail /> },
  { path: "/rewards/add-reward", component: <RewardDetail /> },


  // Settings
  { path: "/setting-api", component: <ApiSetting /> },
  { path: "/profile", component: <Profile /> },

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
