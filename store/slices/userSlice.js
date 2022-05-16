import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = []
export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state,{payload}) =>{
      state.push(payload)
    }, 
  },
  extraReducers:{
   [HYDRATE]: (state,{payload}) =>{
    state.push(payload)
   }
  },
})


export const { setUser } = userSlice.actions

export default userSlice.reducer