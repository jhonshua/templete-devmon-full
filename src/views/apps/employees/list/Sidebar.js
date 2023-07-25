// ** React Import
import { useEffect, useState } from 'react';

// ** Custom Components
import Sidebar from '@components/sidebar';

// ** Utils
import { selectThemeColors } from '@utils';

// ** Third Party Components
import Select from 'react-select';
import classnames from 'classnames';
import { useForm, Controller } from 'react-hook-form';
import toast from 'react-hot-toast';

// ** Reactstrap Imports
import { Button, Label, Form, Input, Spinner } from 'reactstrap';

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, setSidebar } from '../store';
import { getData as getRoles } from '../../roles-permissions/store/index';
import { getData as getCompanies } from '../../companies/store';

const defaultValues = {
  name: '',
  last_name: '',
  mothers_name: '',
  rfc: '',
  bank: '',
  account: '',
  account_name: '',
  clabe: '',
  company_id: null,
};

const SidebarNewUsers = () => {
  // ** States
  const [data, setData] = useState(null);
  const [apiErrors, setErrors] = useState(null);
  const [plan, setPlan] = useState('basic');
  const [role, setRole] = useState('');
  const [company, setCompany] = useState('');
  const store = useSelector(state => state.employees);
  const companies = useSelector(state => state.companies);

  // ** Store Vars
  const dispatch = useDispatch();

  useEffect(() => {
    if (store.error) {
      if (store.error.errors && Object.keys(store.error.errors).length) {
        setErrors(store.error?.errors);
        // Show toast error for each error
        for (const sKey in store.error?.errors) {
          toast.error(store.error?.errors[sKey]);
        }
      } else {
        toast.error(store.error.message);
      }
    }
  }, [store?.error]);

  useEffect(() => {
    dispatch(
      getRoles({
        sort: 'desc',
        sortColumn: 'id',
        q: '',
        page: 1,
        perPage: 50,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      getCompanies({
        sort: 'desc',
        sortColumn: 'desc',
        q: '',
        page: 1,
        perPage: 50,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    if (apiErrors) {
      for (const sKey in apiErrors) {
        setError(sKey, { type: 'manual', message: apiErrors[sKey] });
      }
    }
  }, [apiErrors]);

  // ** Vars
  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (store.selectedEmployee) {
      let oData = { ...store.selectedEmployee };
      for (const sKey in defaultValues) {
        setValue(sKey, oData[sKey]);
      }
    }
  }, [store?.selectedEmployee]);

  const toggleSidebar = () => {
    dispatch(setSidebar(!store.sidebar));
  };

  // ** Function to handle form submit
  const onSubmit = data => {
    const oSend = { ...data, company_id: company };
    setData(data);

    dispatch(
      addEmployee({
        ...oSend,
      })
    );
  };

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '');
    }
    setRole('subscriber');
    setPlan('basic');
  };

  return (
    <Sidebar
      size='lg'
      open={store?.sidebar || false}
      title={`${store.selectedUser ? 'Modificar' : 'Nuevo'} Usuario`}
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='name'>
            Nombre <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <Input
                id='name'
                placeholder=''
                invalid={errors.name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='last_name'>
            Apellido Paterno <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='last_name'
            control={control}
            render={({ field }) => (
              <Input
                id='last_name'
                placeholder=''
                invalid={errors.last_name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='mothers_name'>
            Apellido materno <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='mothers_name'
            control={control}
            render={({ field }) => (
              <Input
                id='mothers_name'
                placeholder=''
                invalid={errors.mothers_name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='rfc'>
            RFC <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='rfc'
            control={control}
            render={({ field }) => (
              <Input
                id='rfc'
                placeholder=''
                invalid={errors.rfc && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='account_name'>
            Cuenta <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='account_name'
            control={control}
            render={({ field }) => (
              <Input
                id='account_name'
                placeholder=''
                invalid={errors.account_name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='bank'>
            Banco <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='bank'
            control={control}
            render={({ field }) => (
              <Input
                id='bank'
                placeholder=''
                invalid={errors.bank && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='account'>
            Numero de cuenta <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='account'
            control={control}
            render={({ field }) => (
              <Input
                id='account'
                placeholder=''
                invalid={errors.account && true}
                {...field}
              />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='clabe'>
            CLABE <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='clabe'
            control={control}
            render={({ field }) => (
              <Input
                id='clabe'
                placeholder=''
                invalid={errors.clabe && true}
                {...field}
              />
            )}
          />
        </div>
        <div
          className='mb-1'
          value={company}
          onChange={e => setCompany(e.target.value)}
        >
          <Label className='form-label' for='select-plan'>
            Seleccionar Compañia
          </Label>
          <Input type='select' id='select-plan' name='select-plan'>
            <option value=''>Seleccionar compañia</option>
            {companies.data?.map(oCompany => (
              <option key={oCompany._id} value={oCompany._id}>
                {oCompany.name}
              </option>
            ))}
          </Input>
        </div>
        <Button
          disabled={store.loading}
          type='submit'
          className='me-1'
          color='primary'
        >
          {store.loading ? <Spinner color='light' /> : 'Guardar'}
        </Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>
          Cancelar
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarNewUsers;
