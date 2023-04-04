import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../../data.js';
import Product from '../productModel.js';

const productRouter = express.Router();

// list of products
productRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    // finding all product to send it to frontend
    const products = await Product.find({});
    res.send(products);
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
    const product = await Product.findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product not Found' });
    }
  })
);

export default productRouter;