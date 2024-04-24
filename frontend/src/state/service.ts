import { createSlice } from "@reduxjs/toolkit"

interface IintialState {
  serviceId : string,
  description: string,
  type: string,
  dateCreated: string,
  authorName: string,
}
const initialState: IintialState = {
  serviceId: '',
  description: '',
  type: '',
  dateCreated: '',
  authorName: '',
}

const serviceSlice = createSlice({
  name: 'service',
  initialState,
  reducers: {
    setFormService: (state, action) => {
      state.serviceId = action.payload.serviceId,
      state.description = action.payload.description,
      state.type = action.payload.type,
      state.dateCreated = action.payload.dateCreated,
      state.authorName = action.payload.authorName
    },
    emptyFormService: (state) => {
      state.serviceId = ""
      state.description = "",
      state.type = "",
      state.dateCreated = "",
      state.authorName = " "
    },
  }
})

export const { setFormService, emptyFormService } = serviceSlice.actions;
export default serviceSlice.reducer;
