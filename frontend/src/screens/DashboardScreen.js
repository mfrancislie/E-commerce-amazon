import React, { useEffect } from 'react';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { summaryOrder } from '../actions/orderActions';
import Chart from 'react-google-charts';

const DashboardScreen = () => {
  const orderSummary = useSelector((state) => state.orderSummary);
  const { loading, error, summary } = orderSummary;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(summaryOrder());
  }, [dispatch]);

  return (
    <div>
      <div className="row">
        <h1>Dashboard</h1>
      </div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger"></MessageBox>
      ) : (
        <>
          <ul className="row summary">
            <li>
              <div className="summary-title color1">
                <span>
                  <i className="fa fa-users">User</i>
                </span>
              </div>
              <div className="summary-body">{summary.users[0].numUsers}</div>
            </li>
            <li>
              <div className="summary-title color2">
                <span>
                  <i className="fa fa-shopping-cart">Orders</i>
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0] ? summary.orders[0].numOrders : 0}
              </div>
            </li>
            <li>
              <div className="summary-title color3">
                <span>
                  <i className="fa fa-money">Sales</i>
                </span>
              </div>
              <div className="summary-body">
                {summary.orders[0]
                  ? summary.orders[0].totalSales.toFixed(2)
                  : 0}
              </div>
            </li>
          </ul>
          {/* for the daily orders charts */}
          <div>
            <div>
              <h2>Sales</h2>
              {summary.dailyOrders.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  with="100%"
                  height="400px"
                  chartType="AreaChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Date', 'Sales'],
                    ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                  ]}
                />
              )}
            </div>
          </div>
          {/* for the category charts */}
          <div>
            <div>
              <h2>Categories</h2>
              {summary.productCategories.length === 0 ? (
                <MessageBox>No Sale</MessageBox>
              ) : (
                <Chart
                  with="100%"
                  height="400px"
                  chartType="PieChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ['Category', 'Products'],
                    ...summary.productCategories.map((x) => [x._id, x.count]),
                  ]}
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DashboardScreen;
