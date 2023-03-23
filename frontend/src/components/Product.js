import React from 'react';
import Rating from './Rating';

const Product = (props) => {
  const { product } = props;
  return (
    <div>
      <div className="card" key={product._id}>
        <a href={`/product/${product._id}`}>
          {/* <!-- image size: 680px by 830px --> */}
          <img className="medium" src={product.image} alt={product.name} />
        </a>
        <div className="card-body">
          <a href={`/product/${product._id}`}>
            <h2>{product.name}</h2>
          </a>
          <Rating
            rating={product.rating}
            numReviews={product.numReviews}
          ></Rating>
          <div className="price">Php {product.price}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
