import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
const initialState = []
export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudget:(state,{payload})=>{
      state.push(payload)
    },
    addingNewBudget: (state,{payload}) =>{
        state.push(payload)
    }, 
    deleteOneBudget: (state,{payload}) =>{
        state = state.filter((item)=>item.id!=payload)
    },
    modifyOneBudget: (state,{payload}) =>{
        state = state.map((item)=>{if(item.id==payload.id){item = payload}})
    },
  },
  // extraReducers:{
  //  [HYDRATE]: (state,{payload}) =>{
  //       state = state.budgets.push(payload)
  //  }
  // },
})

export const { setBudget, addingNewBudget, deleteOneBudget,modifyOneBudget } = budgetSlice.actions
export default budgetSlice.reducer