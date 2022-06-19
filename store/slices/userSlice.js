import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {username: '', id: '', email: '', image: '', age: 0}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state,{payload}) =>{
      return {...state,...payload}
    }, 
  },
  extraReducers:{
   [HYDRATE]: (state,{payload}) =>{
    return {...state,...payload.user}
   }
  },
})


export const { setUser } = userSlice.actions

export default userSlice.reducer