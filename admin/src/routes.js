import React from 'react';

const Dashboard = React.lazy(() => import('./views/Dashboard'));
const Admin = React.lazy(() => import('./views/Admin/admin.js'));
const Login = React.lazy(() => import('./views/Login/login.js'));
const Jenis = React.lazy(() => import('./views/Jenis/jenis.js'));
const Member = React.lazy(() => import('./views/Member/member.js'));
const Topup = React.lazy(() => import('./views/Topup/topup.js'));
const Transaksi = React.lazy(() => import('./views/Transaksi/transaksi.js'));

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'Login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/admin', name: 'Admin', component: Admin },
  {
    path: '/jenis',
    name: 'Jenis',
    component: Jenis
  },
  {
    path: '/member',
    name: 'member',
    component: Member
  },
  {
    path: '/transaksi',
    name: 'Transaksi',
    component: Transaksi
  },
  {
    path: '/Topup',
    name: 'Topup',
    component: Topup
  }
  // { path: '/users/:id', exact: true, name: 'User Details', component: User },
];

export default routes;
