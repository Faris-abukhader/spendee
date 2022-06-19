import { configureStore } from '@reduxjs/toolkit'
import transactionSlice from './slices/transactionSlice'
import transactionCategorySlice from './slices/transactionCategorySlice'
import budgetSlice from './slices/budgetSlice'
import userSlice from './slices/userSlice'
import { createWrapper } from 'next-redux-wrapper'

const makeStore = ()=>configureStore({
  reducer: {
      user:userSlice,
      transaction:transactionSlice,
      budget:budgetSlice,
      transactionCategory:transactionCategorySlice,
  },
})

export const wrapper = createWrapper(makeStore)