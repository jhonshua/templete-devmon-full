// ** Icons Import
import {
  Briefcase,
  Calendar,
  FileText,
  Circle,
  User,
  Shield,
  Users,
  DollarSign,
  Airplay 
} from 'react-feather';

export default [
  {
    header: 'Apps & Pages',
  },
  // {
  //   id: 'calendar',
  //   title: 'Calendar',
  //   icon: <Calendar size={20} />,
  //   navLink: '/apps/calendar',
  // },
  {
    id: 'payments',
    title: 'Dispersiones',
    icon: <DollarSign size={20}/>,
    navLink: '/apps/payments/list'
  },
  {
    id: 'plans',
    title: 'Planes',
    icon: <Airplay size={20}/>,
    navLink: '/apps/plans/list'
  },
  // {
  //   id: 'invoiceApp',
  //   title: 'Invoice',
  //   icon: <FileText size={20} />,
  //   children: [
  //     {
  //       id: 'invoiceList',
  //       title: 'List',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/list',
  //     },
  //     {
  //       id: 'invoicePreview',
  //       title: 'Preview',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/preview',
  //     },
  //     {
  //       id: 'invoiceEdit',
  //       title: 'Edit',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/edit',
  //     },
  //     {
  //       id: 'invoiceAdd',
  //       title: 'Add',
  //       icon: <Circle size={12} />,
  //       navLink: '/apps/invoice/add',
  //     },
  //   ],
  // },
  {
    id: 'companies',
    title: 'Compañias',
    icon: <Briefcase />,
    navLink: '/apps/companies',
  },
  {
    id: 'employees',
    title: 'Empleados',
    icon: <Users />,
    navLink: '/apps/employees/list',
  },
  {
    id: 'loans',
    title: 'Prestamos',
    icon: <DollarSign />,
    navLink: '/apps/loans',
  },
  {
    id: 'roles-permissions',
    title: 'Roles & Permisos',
    icon: <Shield size={20} />,
    children: [
      {
        id: 'roles',
        title: 'Roles',
        icon: <Circle size={12} />,
        navLink: '/apps/roles',
      },
      {
        id: 'permissions',
        title: 'Permisos',
        icon: <Circle size={12} />,
        navLink: '/apps/permissions',
      },
    ],
  },
  {
    id: 'users',
    title: 'Usuarios',
    icon: <User size={20} />,
    children: [
      {
        id: 'list',
        title: 'Listado',
        icon: <Circle size={12} />,
        navLink: '/apps/user/list',
      },
      // {
      //   id: 'view',
      //   title: 'View',
      //   icon: <Circle size={12} />,
      //   navLink: '/apps/user/view',
      // },
    ],
  },
];
