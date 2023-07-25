import { store } from '@store/store';

import { MoreVertical, Trash2, Archive, Info } from 'react-feather'

import {
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import { deleteLoan, setLoan } from './store';

const statusObj = {
  0: 'light-warning',
  1: 'light-success',
  2: 'light-secondary'
};

export const columns = (toggle, modal) => [
  {
    name: 'Empleado',
    sortable: true,
    minWidth: '300px',
    sortField: 'name',
    selector: row => row.employee_id,
    cell: row => <span className="text-capitalze">{row.employee?.name}</span>,
  },
  {
    name: 'Fecha',
    sortable: true,
    minWidth: '300px',
    sortField: 'start_date',
    selector: row => row.start_date,
    cell: row => <span className="text-capitalize">{row.start_date}</span>,
  },
  {
    name: 'Tasa',
    sortable: true,
    minWidth: '300px',
    sortField: 'rates',
    selector: row => row.rates,
    cell: row => <span className="text-capitalize">{row.rates}</span>,
  },
  {
    name: 'Monto',
    sortable: true,
    minWidth: '300px',
    sortField: 'amount',
    selector: row => row.amount,
    cell: row => <span className="text-capitalize">{row.amount}</span>,
  },
  {
    name: 'Estatus',
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
        <UncontrolledDropdown >
          <DropdownToggle tag='div' className='btn btn-sm'>
            <MoreVertical size={14} className='cursor-pointer' />
          </DropdownToggle>
          <DropdownMenu>
          <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault()
                store.dispatch(setLoan(row));
                modal()
              }}
            >
              <Info size={14} className='me-50' />
              <span className='align-middle'>Detalles</span>
            </DropdownItem>
            <DropdownItem
              tag='a'
              href='/'
              className='w-100'
              onClick={e => {
                e.preventDefault();
                store.dispatch(setLoan(row));
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
                store.dispatch(deleteLoan(row._id))
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
