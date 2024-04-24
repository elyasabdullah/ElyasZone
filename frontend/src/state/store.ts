import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authApi } from "src/data/auth";
import userSlice from './user';
import serviceSlice from './service';
import myServiceSlice from './myservice';
import updateServiceSlice from './updateservice';
import {serviceApi} from 'src/data/service';


const reducers = combineReducers({
  user: userSlice,
  service: serviceSlice,
  myService: myServiceSlice,
  updateService: updateServiceSlice,
  [authApi.reducerPath]: authApi.reducer,
  [serviceApi.reducerPath]: serviceApi.reducer,
})

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => 
  getDefaultMiddleware({}).concat([
    authApi.middleware,
    serviceApi.middleware
  ]) 
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
