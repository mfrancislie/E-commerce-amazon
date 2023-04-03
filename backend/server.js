import express from 'express';
import mongoose from 'mongoose';
import data from './data.js';
import userRouter from './models/routers/userRouter.js';

const app = express();
mongoose.connect(
  process.env.MONGODB_URL || 'mongodb://127.0.0.1/Amazon-app-db',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use('/api/users', userRouter);

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
