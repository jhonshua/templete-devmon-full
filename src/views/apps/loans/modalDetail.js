// ** React Imports
/*eslint semi: ["error", "always"]*/
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModal } from './store';

//date dayjs
import dayjs from 'dayjs';

// ** Reactstrap Imports
import {
  Table,
  Badge,
  Modal,
  ModalBody,
  ModalHeader,
  Button
} from 'reactstrap';

const statusObj = {
  0: 'light-warning',
  1: 'light-success',
  2: 'light-secondary'
};

const ModalDetail = () => {

  const dispatch = useDispatch();
  const store = useSelector(state => state.loans);

  const toggleModal = () => {
    dispatch(setModal(!store.modal));
  };


  return (
    <Fragment>
      <Modal
      size='xl'
        isOpen={store.modal || false }
        toggle={toggleModal}
        className='modal-dialog-centered'
      >
        <ModalHeader className='bg-transparent' toggle={toggleModal}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <h1 className='text-center mb-1'>Detalles de pago</h1>
          <Table responsive>
      <thead>
        <tr>
          <th scope='col' className='text-nowrap'>
            Numero de pago
          </th>
          <th scope='col' className='text-nowrap'>
           fecha
          </th>
          <th scope='col'></th>
          <th scope='col' className='text-nowrap'>
            monto
          </th>
          <th scope='col' className='text-nowrap'>
            status
          </th>
        </tr>
      </thead>
      <tbody>
      {
        store?.selectedLoan?.payments.length > 0 ? store.selectedLoan.payments.map((data, i) => {
            return (
        <tr key={i}>
        <td className='text-nowrap'>{data.pay_number}</td>
        <td className='text-nowrap'>{dayjs(data.date).format('DD/MM/YYYY hh:mm:ss')}</td>
        <th scope='col'></th>
        <td className='text-nowrap'>{data.amount}</td>
        <td className='text-nowrap'>
          <Badge color={statusObj[data.status]}>
          {data.status === 0 ? "Inactivo" : data.status === 1 ? "activo" : data.status === 2 ? "Pendiente" : "error"}
          </Badge>
        </td>
      </tr>);
      }) : <tr>
          <th scope='col'></th>
          <th scope='col'></th>
          <th scope='col' className='text-nowrap'>
            No hay detalles de pagos
          </th>
          <th scope='col'></th>
          <th scope='col'></th>
          </tr>
        }       
      </tbody>
    </Table>
  <div className='d-flex justify-content-center m-2'>
    <Button type="reset" color="danger" outline onClick={toggleModal}>
     Cerrar
    </Button>
  </div>
    </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ModalDetail;
