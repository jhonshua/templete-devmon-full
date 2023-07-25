/*eslint semi: ["error", "always"]*/
// import React state
import { useEffect, useState } from 'react';

// ** Styles
import '@styles/react/pages/page-form-validation.scss';

// import Redux
import { useDispatch, useSelector } from 'react-redux';
import { setSidebar, updatePlans, setPlans, addPlans } from './store';

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

const SidebarPlans = () => {
  const [data, setData] = useState(null);
  const [apiErrors, setErrors] = useState(null);
  const store = useSelector(state => state.plans);

  const dispatch = useDispatch();

   //date default form
  const defaultValues = {
    name: '',
    description:''
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
  if (store.selectedPlans) {
    const oData = { ...store.selectedPlans };

    for (const sKey in defaultValues) {
      setValue(sKey, oData[sKey]);
    }
  }
}, [store?.selectedPlans]);

      //reset value sidebar
  const handleSidebarClosed = () => {
    for (const sKey in defaultValues) {
      setValue(sKey, '');
    }
  };
    //close or open sidebar
  const toggleSidebar = () => {
    dispatch(setSidebar(!store.sidebar));
    dispatch(setPlans());
  };
   
 
    //send date
    const onSubmit = data => {
        setData(data);
        if (store?.selectedPlans?._id) {
          dispatch(updatePlans({ id: store.selectedPlans._id, plans: data }));
        console.log(data);
        } else {
          dispatch(addPlans(data));
        }
      };

  return (
    <Sidebar
      size="lg"
      open={store?.sidebar || false}
      title={`${store.selectedCompany ? 'Modificar' : 'Nueva'} Plan`}
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
          <Label className="form-label" for="description">
           Descripción
          </Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input
                id="description"
                invalid={errors.description && true}
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

export default SidebarPlans;
