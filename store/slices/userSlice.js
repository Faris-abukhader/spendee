import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = {username: '', id: '', email: '', image: '', age: 0}

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUser: (state,{payload}) =>{
      // console.log('from set user ')
  

      // state = payload
      return {...state,...payload}
      // state.push(payload)
    }, 
  },
  extraReducers:{
   [HYDRATE]: (state,{payload}) =>{
    // state.push(payload)
    return {...state,...payload.user}

    // console.log('from user extra reducer')
    // console.log(payload.user)
    // return [...state,payload.user]
   }
  },
})


export const { setUser } = userSlice.actions

export default userSlice.reducer