import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
const initialState = []
export const transactionCategorySlice = createSlice({
  name: 'transactionCategory',
  initialState,
  reducers: {
    setTransactionCategory:(state,{payload})=>{
      state.push(payload)
    },
    addingNewTransactionCategory: (state,{payload}) =>{
        state.push(payload)
    }, 
    deleteOneTransactionCategory: (state,{payload}) =>{
        state = state.filter((item)=>item.id!=payload)
    },
    modifyOneTransactionCategory: (state,{payload}) =>{
        state = state.map((item)=>{if(item.id==payload.id){item = payload}})
    },
  },
  extraReducers:{
   [HYDRATE]: (state,{payload}) =>{
        state = state.push(payload)
   }
  },
})

export const { setTransactionCategory, addingNewTransactionCategory, deleteOneTransactionCategory,modifyOneTransactionCategory } = transactionCategorySlice.actions
export default transactionCategorySlice.reducer