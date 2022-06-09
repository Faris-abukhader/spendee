import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState = []
export const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    setTransaction: (state,{payload}) =>{
      if(payload !== undefined){
        return [...payload]
      }
      return state
    }, 
    addNewTransaction: (state,{payload}) =>{
        state.push(payload)
    }, 
    deleteOneTransaction: (state,{payload}) =>{
      return state.filter((item)=>item.id!=payload)
    },
    modifyOneTransaction: (state,{payload}) =>{
       return  state.map((item)=>{
          if(item.id != payload.id){
            return item
          }
          return payload
        })
    },
  },
  extraReducers:{
   [HYDRATE]: (state,{payload}) =>{
      return [...payload.transaction]
   },
  },
})


export const { setTransaction, addNewTransaction, deleteOneTransaction, modifyOneTransaction } = transactionSlice.actions

export default transactionSlice.reducer