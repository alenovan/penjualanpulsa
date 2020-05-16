import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Login = React.lazy(() => import('./views/Login/login.js'));
const Daftar = React.lazy(() => import('./views/Login/daftar.js'));
const order = React.lazy(() => import('./views/Order/Order.js'));
const pembayaran = React.lazy(() => import('./views/Pembayaran/Pembayaran.js'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/daftar', name: 'Daftar', component: Daftar },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/pembayaran', name: 'Pembayaran', component: pembayaran },
  { path: '/order', name: 'Order', component: order}
];

export default routes;
