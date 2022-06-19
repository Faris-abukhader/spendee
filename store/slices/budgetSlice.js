import { createSlice } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
const initialState = []
export const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    setBudget:(state,{payload})=>{
      if(payload !== undefined){
        return [...payload]
      }
      return state
    },
    addingNewBudget: (state,{payload}) =>{
      state.push(payload)
    }, 
    deleteOneBudget: (state,{payload}) =>{
        state = state.filter((item)=>item.id!=payload)
    },
    modifyOneBudget: (state,{payload}) =>{
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
     return [...payload.budget]
   }
  },
})

export const { setBudget, addingNewBudget, deleteOneBudget,modifyOneBudget } = budgetSlice.actions
export default budgetSlice.reducer