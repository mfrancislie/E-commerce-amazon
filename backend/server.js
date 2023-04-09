import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './models/routers/productRouter.js';
import userRouter from './models/routers/userRouter.js';
import orderRouter from './models/routers/orderRouter.js';

// defining express i need call dotenv.config()
dotenv.config();

const app = express();

// by having this two middleware that all requests that contains data
// the request will be translated to the record body in node application.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://127.0.0.1/Amazon-app-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// created sample users
app.use('/api/users', userRouter);

// created products
app.use('/api/products', productRouter);

app.use('/api/orders', orderRouter);

// This middleware is an error catcher, so when there is an
// error in routers in express async handler or error
// will be redirected to this function or this middleware
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

app.get('/', (req, res) => {
  res.send('Server is Ready!');
});

// list of product
app.get('/api/products', (req, res) => {
  res.send(data.products);
});
// product details
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((x) => x._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found!' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Served at http://localhost:5000'));
