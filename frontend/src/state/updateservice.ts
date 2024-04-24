import { createSlice } from "@reduxjs/toolkit"

interface IintialState {
  serviceId : string,
  description: string,
  type: string,
  contactInfo: string
}

const localData = localStorage.getItem('updateService');
let myServiceData;
if(localData) {
  myServiceData = JSON.parse(localData)
}

const initialState: IintialState = {
  serviceId: myServiceData?.serviceId || '',
  description: myServiceData?.description || '',
  type: myServiceData?.type || '',
  contactInfo: myServiceData?.contactInfo || ''
}

const updateServiceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setUpdateForm: (state, action) => {
      state.serviceId = action.payload.serviceId,
      state.description = action.payload.description,
      state.type = action.payload.type,
      state.contactInfo = action.payload?.contactInfo
    },
    emptyUpdateForm: (state) => {
      state.serviceId = ""
      state.description = "",
      state.type = "",
      state.contactInfo = ""
    },
  }
})

export const { setUpdateForm, emptyUpdateForm } = updateServiceSlice.actions;
export default updateServiceSlice.reducer;
