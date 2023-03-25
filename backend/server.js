import express from 'express';
import data from './data.js';

const app = express();

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
