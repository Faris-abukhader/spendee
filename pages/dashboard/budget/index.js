import React from 'react'
import Layout from '../../../components/layout/Client'
import AddNewBudgetCard from '../../../components/budget/AddNewBudgetCard'
import BudgetCategoriesSelector from '../../../components/budget/BudgetCategoriesSelector'
export default function index() {
  return (
      <Layout>
    <div className='row align-items-center justify-content-start px-3'>
    <AddNewBudgetCard/>
    </div>
    </Layout>
  )
}
