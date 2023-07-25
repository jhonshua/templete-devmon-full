import { store } from '@store/store';

import { MoreVertical, Trash2, Archive } from 'react-feather'

import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { deleteCompany, setCompany } from './store';

const statusObj = {
  0: 'light-warning',
  1: 'light-success',
  2: 'light-secondary'
};

export const columns = toggle => [
  {
    name: 'Compañia',
    sortable: true,
    minWidth: '500px',
    sortField: 'name',
    selector: row => row.name,
    cell: row => <span className="text-capitalze">{row.name}</span>,
  },
  {
    name: 'RFC',
    sortable: true,
    minWidth: '300px',
    sortField: 'rfc',
    selector: row => row.rfc,
    cell: row => <span className="text-capitalize">{row.rfc}</span>,
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
          ? 'Inactivo'
          : row.status === 1
            ? 'Activo'
            : 'Inactivo'
        }
      </Badge>
    )
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
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault();
                store.dispatch(setCompany(row));
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
                e.preventDefault()
                store.dispatch(deleteCompany(row._id))
              }}
            >
              <Trash2 size={14} className='me-50' />
              <span className='align-middle'>Desactivar</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    )
  },
];
