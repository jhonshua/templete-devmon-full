import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Controller, useForm } from 'react-hook-form';

import Sidebar from '@components/sidebar';

import { addLoan, setSidebar, updateLoan } from './store';
import { Button, Form, Input, Label, Spinner } from 'reactstrap';
import { toast } from 'react-hot-toast';

const defaultValues = {
  name: '',
  trade_name: '',
  attorney: '',
  address: '',
  rfc: '',
  status: 1,
  account: '',
  plan_id: '637b9eb63abc434ee18cd9d9',
};

const SidebarCompanies = () => {
  const [data, setData] = useState(null);
  const [apiErrors, setErrors] = useState(null);
  const store = useSelector(state => state.loans);

  const dispatch = useDispatch();

  useEffect(() => {
    if (store.error) {
      if (store.error.errors && Object.keys(store.error.errors).length) {
        setErrors(store.error?.errors);
        for (const sKey in store.error?.errors) {
          toast.error(store.error?.errors[sKey]);
        }
      } else {
        toast.error(store.error.message);
      }
    }
  }, [store?.error]);

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  useEffect(() => {
    if (apiErrors) {
      for (const sKey in apiErrors) {
        setError(sKey, { type: 'manual', message: apiErrors[sKey] });
      }
    }
  }, [apiErrors]);

  useEffect(() => {
    if (store.selectedCompany) {
      let oData = { ...store.selectedCompany };

      for (const sKey in defaultValues) {
        setValue(sKey, oData[sKey]);
      }
    }
  }, [store?.selectedCompany]);

  const toggleSidebar = () => {
    dispatch(setSidebar(!store.sidebar));
  };

  const onSubmit = data => {
    const oSend = { ...data };
    setData(data);

    if (store?.selectedCompany?._id) {
      dispatch(updateLoan({ id: store.selectedCompany._id, company: data }));
    } else {
      dispatch(addLoan(data));
    }
  };

  const handleSidebarClosed = () => {
    for (const sKey in defaultValues) {
      setValue(sKey, '');
    }
  };

  return (
    <Sidebar
      size="lg"
      open={store?.sidebar || false}
      title={`${store.selectedCompany ? 'Modificar' : 'Nueva'} Compañia`}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-1">
          <Label className="form-label" for="name">
            Nombre <span className="text-danger">*</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                id="name"
                invalid={errors.name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="trade_name">
            Razon Social
          </Label>
          <Controller
            name="trade_name"
            control={control}
            render={({ field }) => (
              <Input
                id="trade_name"
                invalid={errors.trade_name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="attorney">
            Representante Legal
          </Label>
          <Controller
            name="attorney"
            control={control}
            render={({ field }) => (
              <Input
                id="attorney"
                invalid={errors.attorney && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="address">
            Direccion
          </Label>
          <Controller
            name="address"
            control={control}
            render={({ field }) => (
              <Input
                id="address"
                invalid={errors.address && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="rfc">
            RFC
          </Label>
          <Controller
            name="rfc"
            control={control}
            render={({ field }) => (
              <Input
                id="rfc"
                invalid={errors.rfc && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="account">
            Cuenta Bancaria
          </Label>
          <Controller
            name="account"
            control={control}
            render={({ field }) => (
              <Input
                id="account"
                invalid={errors.account && true}
                {...field}
              />
            )}
          />
        </div>
        <Button disabled={store.loading} type="submit" className="me-1" color="primary">
          {store.loading ?
            <Spinner color="light" />
            : 'Guardar'
          }
        </Button>
        <Button type="reset" color="secondary" outline onClick={toggleSidebar}>
          Cancelar
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarCompanies;
