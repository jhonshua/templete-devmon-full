/*eslint semi: ["error", "always"]*/
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiCall, FIND, CREATE, UPDATE } from '../../../../service/api';


export const getData  = createAsyncThunk('plans/getData', async params => {
  const response = await apiCall(
    FIND,
    'plans',
    {},
    {
    limit: params.perPage,
    queries: params.q,
    skip: (params.perPage * params.page) - params.perPage 
    }
  );
    return {
      params,
      data: response.data.data,
      total:response.data.total
    };
  });

  export const setLoader = createAsyncThunk('plans/setLoader', value => {
    return {
      value
    };
  });
  
  export const setError = createAsyncThunk('plans/setError', params => {
    return {
      error: params.error
    };
  });

  export const setSidebar = createAsyncThunk('plans/setSidebar', value => {
    return {
      value
    };
  });
  
  export const setPlans = createAsyncThunk('plans/setPlans', plans => {
        if (!plans) return { plans:null};
      return {
        plans
      };
    });
  
 export const addPlans = createAsyncThunk('plans/addPlans',
      async (plans, { dispatch, getState }) => {
        try {
          dispatch(setLoader(true));

          const response = await apiCall(CREATE, 'plans', plans);
          
          dispatch(setLoader(false));
         
          if (response.status === 201) {
          
            await dispatch(getData(getState().plans.params));
          
            dispatch(setSidebar(false));
          
            return response.data;
          }

        } catch (e) {
          dispatch(setLoader(false));
          const { response } = e;    
          dispatch(setError({ error: response.data || response || e }));
        }
        return plans;
      }
    );

  export const updatePlans = createAsyncThunk('plans/update',
    async ({ id, payload }, { dispatch, getState }) => {
      try {
        dispatch(setLoader(true));
        const oResponse = await apiCall(UPDATE, 'plans', payload, { id });
      
        dispatch(setLoader(false));
      
        if (oResponse.status === 200) {
      
          await dispatch(getData(getState().plans.params));
      
          dispatch(setSidebar(false));
      
          return oResponse.data;
        }
      } catch (e) {
        dispatch(setLoader(false));
        const { response } = e;
  
        dispatch(setError({ error: response.data || response || e }));
      }
      return payload;
    }
  );

  export const appPlanSlice = createSlice({
    name: 'plans',
    initialState: {
      data: [],
      params: {},
      selectedPlans:null,
      total:0,
      error: null,
      sidebar:false,
      loading: false
    },
    reducers: {},
    extraReducers: builder => {
      builder.addCase(getData.fulfilled, (state, action) => {
        state.data = action.payload.data;
        state.total = action.payload.total;
        state.params = action.payload.params;
      })

      .addCase(setError.fulfilled, (state, action) => {
        state.error = action.payload.error;
      })

      .addCase(setSidebar.fulfilled, (state, action) => {
        state.sidebar = action.payload.value;
      })

      .addCase(setLoader.fulfilled, (state, action) => {
        state.loading = action.payload.value;
      })
      .addCase(setPlans.fulfilled, (state, action) => {
        state.selectedPlans = action.payload.plans;
      });
    }
  });

  export default appPlanSlice.reducer;

