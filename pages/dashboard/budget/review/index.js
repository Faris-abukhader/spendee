import React from 'react'
import Layout from '../../../../components/layout/Client'
import Breadcrumb from '../../../../components/reviewBudget/Breadcrumb'
import BudgetProgress from '../../../../components/reviewBudget/BudgetProgress'
import BudgetReviewCards from '../../../../components/reviewBudget/BudgetReviewCards'
export default function index() {
  return (
      <Layout>
          <Breadcrumb/>
          <BudgetReviewCards/>
          <BudgetProgress/>
      </Layout>
  )
}
