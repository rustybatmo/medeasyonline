import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'

import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectInventoryOrders } from '../../redux/selectors/inventorySelectors'
import { fetchAllOrders } from '../../redux/actions/inventoryActions'

import Spinner from '../../components/Spinner'
import OrdersList from '../../components/AdminPage/OrdersList'
import AdminCarousel from '../../components/AdminPage/AdminCarousel'

const Adminorders = ({
  orders,
  fetchAllOrders,
  onClick,
  history,
  match: { url }
}) => {
  // If there are no orders on state, means fetch them
  useEffect(() => {
    if (!orders) fetchAllOrders()
  }, [orders, fetchAllOrders])

  const [pageNumber, setPageNumber] = useState(1)
  const handleClick = page => setPageNumber(page)

  return !orders ? (
    <Spinner white={false} />
  ) : (
    <div className='AdminDashboardPage__orders'>
      <Helmet>
        <title>Medeasy - All Orders</title>
        <meta name='description' content='All Orders' />
      </Helmet>
      <div className='AdminDashboardPage__orders-info'>
        <h2>ALL orders</h2>
      </div>
      <OrdersList
        url={url}
        history={history}
        orders={orders.slice((pageNumber - 1) * 10, 10 * pageNumber)}
      />
      <AdminCarousel
        onClick={handleClick}
        totalPages={Math.ceil(orders.length / 10)}
        currentPageNumber={pageNumber}
      />
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
  orders: selectInventoryOrders
})

export default connect(mapStateToProps, { fetchAllOrders })(Adminorders)
