import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../../data.js';
import { isAdmin, isAuth, isSellerOrisAdmin } from '../../utils.js';
import Product from '../productModel.js';

const productRouter = express.Router();

// list of products
productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const name = req.query.name || '';
    const nameFilter = name ? { name: { $regex: name, $options: 'i' } } : {};

    const category = req.query.category || '';
    const categoryFilter = category ? { category } : {};

    const seller = req.query.seller || '';
    const sellerFilter = seller ? { seller } : {};

    const min =
      req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0;
    const max =
      req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0;
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {};

    const rating =
      req.query.rating && Number(req.query.rating) !== 0
        ? Number(req.query.rating)
        : 0;
    const ratingFilter = rating ? { rating: { $gte: rating } } : {};

    const order = req.query.order || '';
    const sortOrder =
      order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : { _id: -1 };

    // finding all product to send it to frontend
    const products = await Product.find({
      ...sellerFilter,
      ...nameFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .populate('seller', 'seller.name seller.logo')
      .sort(sortOrder);
    res.send(products);
  })
);

productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);

productRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Product.deleteMany({})
    const createdProducts = await Product.insertMany(data.products);
    res.send({ createdProducts });
  })
);

// For product Details
productRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id).populate(
      'seller',
      'seller.name seller.logo seller.rating seller.numReviews'
    );
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product not Found' });
    }
  })
);

// create product
productRouter.post(
  '/',
  isAuth,
  isSellerOrisAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = new Product({
      name: 'sample name' + Date.now(),
      seller: req.user._id,
      category: 'sample category',
      brand: 'sample brand',
      image: '/images/p1.jpg',
      description: 'sample description',
      countInStock: 0,
      price: 0,
      rating: 0,
      numReviews: 0,
    });

    const createdProduct = await product.save();
    res.send({ message: 'Created Product', product: createdProduct });
  })
);

// update product
productRouter.put(
  '/:id',
  isAuth,
  isSellerOrisAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.name = req.body.name;
      product.category = req.body.category;
      product.image = req.body.image;
      product.price = req.body.price;
      product.brand = req.body.brand;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      const updatedProduct = await product.save();
      res.send({ message: 'Product Updated', product: updatedProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

productRouter.delete(
  '/:id',
  isAuth,
  isSellerOrisAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (product) {
      const deleteProduct = await product.remove;
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);

export default productRouter;
