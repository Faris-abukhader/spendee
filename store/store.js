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


// export const store = configureStore({
//   reducer: {
//       user:userSlice,
//       transactions:transactionSlice,
//       budget:budgetSlice,
//       transactionCategory:transactionCategorySlice,
//   },
// })

export const wrapper = createWrapper(makeStore)


// import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import { HYDRATE, createWrapper } from 'next-redux-wrapper'
// import transactionSlice from './slices/transactionSlice'
// import transactionCategoryReducer from './slices/transactionCategorySlice'

// const combinedReducer = combineReducers({
//   transactionSlice,
//   transactionCategoryReducer,
// });

// const masterReducer = (state, action) => {
//   console.log('hello from masterReducer ' +action.type)
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             transactionCategoryReducer: {
//               transactionCategoryReducer: [...state.users.users,...action.payload.users.users]
//             },
//             transactionSlice: {
//               transactionSlice: [ ...state.users.users,...action.payload.users.users]
//             }
//         }
//         return nextState;
//     } else {
//     return combinedReducer(state, action)
//   }
// }

// export const makeStore = () =>
//   configureStore({
//     reducer: masterReducer,
//   });

// export const wrapper = createWrapper(makeStore, { debug: true });
