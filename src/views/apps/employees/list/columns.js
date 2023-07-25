// ** React Imports
import { Link } from 'react-router-dom';

// ** Custom Components
import Avatar from '@components/avatar';

// ** Store & Actions
import { store } from '@store/store';
import { useSelector } from 'react-redux';
import { deleteEmployee, getEmployee, setEmployee } from '../store';

// ** Icons Imports
import {
  Slack,
  User,
  Settings,
  Database,
  Edit2,
  MoreVertical,
  FileText,
  Trash2,
  Archive,
} from 'react-feather';

// ** Reactstrap Imports
import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

// ** Renders Client Columns
const renderClient = row => {
  if (row.avatar?.length) {
    return <Avatar className='me-1' img={row.avatar} width='32' height='32' />;
  } else {
    return (
      <Avatar
        initials
        className='me-1'
        color={row.avatarColor || 'light-primary'}
        content={row.full_name || row.username || 'John Doe'}
      />
    );
  }
};

// ** Renders Role Columns
const renderRole = row => {
  const roleObj = {
    subscriber: {
      class: 'text-primary',
      icon: User,
    },
    maintainer: {
      class: 'text-success',
      icon: Database,
    },
    editor: {
      class: 'text-info',
      icon: Edit2,
    },
    author: {
      class: 'text-warning',
      icon: Settings,
    },
    admin: {
      class: 'text-danger',
      icon: Slack,
    },
  };

  const Icon = roleObj[row.role] ? roleObj[row.role].icon : Edit2;

  return (
    <span className='text-truncate text-capitalize align-middle'>
      <Icon
        size={18}
        className={`${roleObj[row.role] ? roleObj[row.role].class : ''} me-50`}
      />
      {row.role}
    </span>
  );
};

const statusObj = {
  0: 'light-warning',
  1: 'light-success',
  2: 'light-secondary',
};

export const columns = toggle => [
  {
    name: 'Nombre',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.name,
    cell: row => <span className='text-capitalize'>{row.name}</span>,
  },
  {
    name: 'Apellidos',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.full_name,
    cell: row => (
      <span className='text-capitalize'>
        {row.last_name} {row.mothers_name}
      </span>
    ),
  },
  {
    name: 'Compañia',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.full_name,
    cell: row => <span className='text-capitalize'>{row.company_id}</span>,
  },
  {
    name: 'Status',
    minWidth: '138px',
    sortable: true,
    sortField: 'status',
    selector: row => row.status,
    cell: row => (
      <Badge className='text-capitalize' color={statusObj[row.status]} pill>
        {row.status === 0
          ? 'Pendiente'
          : row.status === 1
          ? 'Activo'
          : 'Inactivo'}
      </Badge>
    ),
  },
  {
    name: 'Acciones',
    minWidth: '100px',
    cell: row => (
      <div className='column-action'>
        <UncontrolledDropdown>
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className='w-100'
              to={`/apps/user/view/${row.id}`}
              onClick={() => store.dispatch(getEmployee(row.id))}
            >
              <FileText size={14} className='me-50' />
              <span className='align-middle'>Details</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault();
                store.dispatch(setEmployee(row));
                toggle();
              }}
            >
              <Archive size={14} className='me-50' />
              <span className='align-middle'>Editar</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault();
                store.dispatch(deleteEmployee(row._id));
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
