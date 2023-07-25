// ** React Imports

import { lazy } from 'react';
import { Navigate } from 'react-router-dom';

const Calendar = lazy(() => import('../../views/apps/calendar'));
const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'));
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'));
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'));
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'));
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'));
const UserList = lazy(() => import('../../views/apps/user/list'));
const UserView = lazy(() => import('../../views/apps/user/view'));
const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'));
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'));
const CompaniesList = lazy(() => import('../../views/apps/companies'));
const EmployeesList = lazy(() => import('../../views/apps/employees/list'));
const LoansList = lazy(() => import('../../views/apps/loans'));
const Payments = lazy(() => import('../../views/apps/payments'));
const Plans = lazy(() => import('../../views/apps/plans'));


const AppRoutes = [
  {
    element: <Calendar />,
    path: '/apps/calendar',
  },
  {
    element: <InvoiceList />,
    path: '/apps/invoice/list',
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id',
  },
  {
    path: '/apps/invoice/preview',
    element: <Navigate to='/apps/invoice/preview/4987' />,
  },
  {
    element: <InvoiceEdit />,
    path: '/apps/invoice/edit/:id',
  },
  {
    path: '/apps/invoice/edit',
    element: <Navigate to='/apps/invoice/edit/4987' />,
  },
  {
    element: <InvoiceAdd />,
    path: '/apps/invoice/add',
  },
  {
    path: '/apps/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank',
    },
  },
  {
    element: <CompaniesList />,
    path: '/apps/companies',
  },
  {
    element: <EmployeesList />,
    path: '/apps/employees/list',
  },
  {
    element: <LoansList />,
    path: '/apps/loans',
  },
  {
    element: <UserList />,
    path: '/apps/user/list',
  },
  {
    path: '/apps/user/view',
    element: <Navigate to='/apps/user/view/1' />,
  },
  {
    element: <UserView />,
    path: '/apps/user/view/:id',
  },
  {
    element: <Roles />,
    path: '/apps/roles',
  },
  {
    element: <Permissions />,
    path: '/apps/permissions',
  },
  {
    element: < Payments/>,
    path: '/apps/payments/list',
  },
  {
    element: < Plans/>,
    path: '/apps/plans/list',
  },
];

export default AppRoutes;
