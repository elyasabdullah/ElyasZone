import { createSlice } from "@reduxjs/toolkit"

interface IintialState {
  serviceId : string,
  description: string,
  type: string,
  dateCreated: string,
  contactInfo: string
}

const localData = localStorage.getItem('myservice');

let myServiceData;
if(localData) {
  myServiceData = JSON.parse(localData)
}

const initialState: IintialState = {
  serviceId: myServiceData?._id || '',
  description: myServiceData?.description || '',
  type: myServiceData?.type || '',
  dateCreated: myServiceData?.dateCreated || '',
  contactInfo: myServiceData?.contactInfo || ''
}

const myserviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setFormMyService: (state, action) => {
      state.serviceId = action.payload.serviceId,
      state.description = action.payload.description,
      state.type = action.payload.type,
      state.dateCreated = action.payload.dateCreated,
      state.contactInfo = action.payload?.contactInfo
    },
    emptyFormMyService: (state) => {
      state.serviceId = ""
      state.description = "",
      state.type = "",
      state.dateCreated = "",
      state.contactInfo = ""
    },
  }
})

export const { setFormMyService, emptyFormMyService } = myserviceSlice.actions;
export default myserviceSlice.reducer;
