// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiCall, CREATE, FIND, UPDATE } from '../../../../service/api';

// ** Axios Imports
import axios from 'axios';

export const setLoader = createAsyncThunk('appEmployees/setLoader', value => {
  return {
    value,
  };
});

export const setSidebar = createAsyncThunk('appEmployees/setSidebar', value => {
  return {
    value,
  };
});

export const setEmployee = createAsyncThunk(
  'appEmployees/setEmployee',
  user => {
    return {
      user,
    };
  }
);

export const setError = createAsyncThunk('appEmployees/setError', params => {
  return {
    error: params.error,
  };
});

export const getData = createAsyncThunk(
  'appEmployees/getData',
  async params => {
    const response = await apiCall(
      FIND,
      'employees',
      {},
      {
        limit: params.perPage,
        skip: params.perPage * params.page - params.perPage,
      }
    );
    return {
      params,
      data: response.data.data,
      totalPages: response.data.total,
    };
  }
);

export const getEmployee = createAsyncThunk(
  'appEmployees/getEmployee',
  async id => {
    const response = await axios.get('/api/users/user', { id });
    return response.data.user;
  }
);

export const addEmployee = createAsyncThunk(
  'appEmployees/addEmployee',
  async (employee, { dispatch, getState }) => {
    try {
      dispatch(setLoader(true));
      const response = await apiCall(CREATE, 'employees', employee);
      dispatch(setLoader(false));
      if (response.status === 201) {
        await dispatch(getData(getState().employees.params));
        dispatch(setSidebar(false));
        return response.data;
      }
    } catch (e) {
      dispatch(setLoader(false));
      const { response } = e;
      // Special case for 409 errors
      if (response.request.status === 409) {
        dispatch(
          setError({
            error: { errors: { username: 'Nombre de usuario ya en uso' } },
          })
        );
        return;
      }

      dispatch(setError({ error: response.data || response || e }));
    }
    return employee;
  }
);

export const deleteEmployee = createAsyncThunk(
  'appEmployees/deleteEmployee',
  async (id, { dispatch, getState }) => {
    const oResponse = await apiCall(UPDATE, 'users', { status: 2 }, { id });
    if (oResponse.status === 200) {
      await dispatch(getData(getState().users.params));
    }
    return id;
  }
);

export const appEmployeesSlice = createSlice({
  name: 'appEmployees',
  initialState: {
    data: [],
    total: 0,
    params: {},
    allData: [],
    selectedUser: null,
    error: null,
    sidebar: false,
    loading: false,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.params = action.payload.params;
        state.total = action.payload.totalPages;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })
      .addCase(setError.fulfilled, (state, action) => {
        state.error = action.payload.error;
      })
      .addCase(setEmployee.fulfilled, (state, action) => {
        state.selectedUser = action.payload.user;
      })
      .addCase(setSidebar.fulfilled, (state, action) => {
        state.sidebar = action.payload.value;
      })
      .addCase(setLoader.fulfilled, (state, action) => {
        state.loading = action.payload.value;
      });
  },
});

export default appEmployeesSlice.reducer;
