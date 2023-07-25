/*eslint semi: ["error", "always"]*/
// import React state
import { useEffect, useState } from 'react';

// ** Styles
import '@styles/react/libs/flatpickr/flatpickr.scss';
import '@styles/react/pages/page-form-validation.scss';

// import Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSidebar, setLoader, updatePayment } from './store';

// ** Third Party Components
import classnames from 'classnames';
import Flatpickr from 'react-flatpickr';

// import form react-hook
import { Controller, useForm } from 'react-hook-form';

// import components Sidebar
import Sidebar from '@components/sidebar';

// import reactstrap and react-hot-toast
import { Button, Form, Input, Label, Spinner } from 'reactstrap';
import { toast } from 'react-hot-toast';

// ** Custom Components
import Avatar from '@components/avatar';
import { Check } from 'react-feather';

const SidebarPayments = () => {
  const [data, setData] = useState(null);
  const [apiErrors, setErrors] = useState(null);
  const store = useSelector(state => state.payments);

  const dispatch = useDispatch();

   //date default form
  const defaultValues = {
    name: '',
    last_name: '',
    created_at: '',
    amount: 0,
    _id:''
  };
  
  //errors
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
    handleSubmit,
    setError,
    formState: { errors }
} = useForm({ defaultValues });
  
 //api  errors  
  useEffect(() => {
    if (apiErrors) {
      for (const sKey in apiErrors) {
        setError(sKey, { type: 'manual', message: apiErrors[sKey] });
      }
    }
  }, [apiErrors]);

 //loading data in sidebar
useEffect(() => {
  if (store.selectedPayment) {
    const oData = { ...store.selectedPayment };

    for (const sKey in defaultValues) {
      setValue(sKey, oData[sKey]);
    }
  }
}, [store?.selectedPayment]);

      //reset value sidebar
  const handleSidebarClosed = () => {
    for (const sKey in defaultValues) {
      setValue(sKey, '');
    }
  };
    //close or open sidebar
  const toggleSidebar = () => {
    dispatch(setSidebar(!store.sidebar));
  };
   
  //envios de datos
  // const onSubmit = data => {
  //     setData(data);
  //    console.log(data);
  //   // if (store?.selectedPayment?._id) {
  //   //   dispatch(updatePayment({ id: store.selectedPayment._id, employee_id: data }));
  //   // } else {
  //   //   dispatch(setLoader(data));
  //   // }
  // };
 
    //send date
  const onSubmit = data => {
      setData(data);
    if (Object.values(data).every(field => field.length > 0)) {
      console.log(data);
      toast(
        <div className='d-flex'>
          <div className='me-1'>
            <Avatar size='sm' color='success' icon={<Check size={12} />} />
          </div>
          <div className='d-flex flex-column'>
            <h6>Payment Submitted!</h6>
          </div>
        </div>
      );
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          });
        }
      }
    }
  };

  return (
    <Sidebar
      size="lg"
      open={store?.sidebar || false}
      title={`Modifict Payment`}
      headerClassName="mb-1"
      contentClassName="pt-0"
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-1">
          <Label className="form-label" for="_id">
            id payment
          </Label>
          <Controller
            name="_id"
            control={control}
            render={({ field }) => (
              <Input
                id="_id"
                invalid={errors._id && true}
                {...field}
              disabled/>
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="name">
            Name <span className="text-danger">*</span>
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
          <Label className="form-label" for="last_name">
           Last Name
          </Label>
          <Controller
            name="last_name"
            control={control}
            render={({ field }) => (
              <Input
                id="last_name"
                invalid={errors.last_name && true}
                {...field}
              />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="date">
           Date
          </Label>
          <Controller
            name="created_at"
            control={control}
            render={({ field }) => (
              // <Input
              //   id="date"
              //   invalid={errors.created_at && true}
              //   {...field}
              // />
            <Flatpickr
              {...field}
              options={{ allowInput: true }} 
               invalid={errors.created_at && true}
               className={classnames('form-control', {
                'is-invalid': data !== null && data.created_at === null
              })}
            />
            )}
          />
        </div>
        <div className="mb-1">
          <Label className="form-label" for="amount">
            Amount
          </Label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <Input
                id="amount"
                invalid={errors.amount && true}
                {...field}
              />
            )}
          />
        </div>
        <Button disabled={store.loading} type="submit" className="me-1" color="primary">
          {store.loading ? <Spinner color="light" /> : 'Guardar'}
        </Button>
        <Button type="reset" color="secondary" outline
         onClick={toggleSidebar}
         >
          Cancelar
        </Button>
      </Form>
    </Sidebar>
  );
};

export default SidebarPayments;
