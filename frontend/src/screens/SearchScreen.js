import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productActions';
import { useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

const SearchScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const { name = 'all' } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProduct({ name: name !== 'all' ? name : '' }));
  }, [dispatch, name]);
  return (
    <div>
      <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger"></MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
        <div className="row top">
          <div className="col-1">
            <h3>Department</h3>
            <ul>
              <li>Category 1</li>
            </ul>
          </div>
          <div className="col-3">
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="error">{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 && (
                  <MessageBox variant="danger">No Product Found</MessageBox>
                )}
                <div className="row center">
                  {products.map((product) => (
                    <Product key={product._id} product={product}></Product>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchScreen;
