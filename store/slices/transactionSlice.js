import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = []
export const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransaction: (state,{payload}) =>{
      console.log('hello from setTransaction')
      console.log(payload)
      state.push(payload)
    }, 
    addNewTransaction: (state,{payload}) =>{
        state.push(payload)
    }, 
    deleteOneTransaction: (state,{payload}) =>{
        state = state.filter((item)=>item.id!=payload)
    },
    modifyOneTransaction: (state,{payload}) =>{
      console.log('modifyOneTransaction was called')
        state.map((item)=>{
          if(item.id != payload.id){
            return item
          }
          
          console.log('^^^^^^^^^^^^^^^^^^^^^^^FOUND IT^^^^^^^^^^^^^^^^^^^^^^^')
          return {
             payload
          }
        })
    },
  },
  extraReducers:{
   [HYDRATE]: (state,{payload,type}) =>{
     console.log('from extraReducers : '+type)
      state.push(payload)
   },
  //  [HYDRATE]:(state,{payload}) =>{
  //   state.push(payload)
  //  },   
  },
})


export const { setTransaction, addNewTransaction, deleteOneTransaction, modifyOneTransaction } = transactionSlice.actions

export default transactionSlice.reducer