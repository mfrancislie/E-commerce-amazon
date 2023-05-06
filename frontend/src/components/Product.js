import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = (props) => {
  const { product } = props;
  return (
    <div>
      <div className="card" key={product._id}>
        <Link to={`/product/${product._id}`}>
          {/* <!-- image size: 680px by 830px --> */}
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link href={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </Link>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="row">
            <div className="price">Php {product.price}</div>

            <div>
              <Link to={`/seller/${product.seller._id}`}>
                {product.seller.seller.name}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
