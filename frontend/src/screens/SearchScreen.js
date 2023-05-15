import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProduct } from '../actions/productActions';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import { prices, ratings } from '../Utils';
import Rating from '../components/Rating';

const SearchScreen = () => {
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategory,
    error: errorCategory,
    categories,
  } = productCategoryList;

  const {
    name = 'all',
    category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = 'newest',
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      listProduct({
        name: name !== 'all' ? name : '',
        category: category !== 'all' ? category : '',
        min,
        max,
        rating,
        order,
        pageNumber,
      })
    );
  }, [dispatch, name, category, min, max, rating, order, pageNumber]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`;
  };
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
        <div>
          Sort by
          <select
            value={order}
            onChange={(e) => navigate(getFilterUrl({ order: e.target.value }))}
          >
            <option value="newest">Newest Arivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
            <option value="toprated">Avg. Customers Reviews</option>
          </select>
        </div>
        <div className="row top">
          <div className="col-1">
            <h3>Department</h3>
            <div>
              {loadingCategory ? (
                <LoadingBox></LoadingBox>
              ) : errorCategory ? (
                <MessageBox variant="danger">{errorCategory}</MessageBox>
              ) : (
                <ul>
                  <li>
                    <Link
                      className={'all' === category ? 'active' : ''}
                      to={getFilterUrl({ category: 'all' })}
                    >
                      All
                    </Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link
                        className={c === category ? 'active' : ''}
                        to={getFilterUrl({ category: c })}
                      >
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div>
              <h3>Prices</h3>
              <ul>
                {prices.map((p) => (
                  <li key={p.name}>
                    <Link
                      to={getFilterUrl({ min: p.min, max: p.max })}
                      className={
                        `${p.min}-${p.max}` === `${min}-${max}` ? 'active' : ''
                      }
                    >
                      {p.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Avg. Customers Review</h3>
              <ul>
                {ratings.map((r) => (
                  <li key={r.name}>
                    <Link
                      to={getFilterUrl({ rating: r.rating })}
                      className={`${r.rating}` === `${rating}` ? 'active' : ''}
                    >
                      <Rating rating={r.rating} caption={'& up'} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
                <div className="row center pagination">
                  {[...Array(pages).keys()].map((x) => (
                    <Link
                      className={x + 1 === page ? 'active' : ''}
                      key={x + 1}
                      to={getFilterUrl({ page: x + 1 })}
                    >
                      {x + 1}
                    </Link>
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
