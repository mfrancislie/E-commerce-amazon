import express from 'express';
import data from '../../data.js';
import bcrypt from 'bcryptjs';
import User from '../userModel.js';
import expressAsyncHandler from 'express-async-handler';
import { generateToken, isAuth, isAdmin } from '../../utils.js';

const userRouter = express.Router();

// to define all users
userRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // to define all orders
    const users = await User.find({});
    res.send(users);
  })
);

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // instead remove({}) im using this deleteMany({})
    // if i refresh it just deleted all users and created users with different id.
    // await User.deleteMany({});

    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          //This token will be generated by Jason Web, token Jason Web told that can generate a hash string
          // that i need to use that for the next request to authenticate the request.
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(
  '/register',
  expressAsyncHandler(async (req, res) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
    });
    const createdUser = await user.save();
    res.send({
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      isAdmin: createdUser.isAdmin,
      token: generateToken(createdUser),
    });
  })
);

// userDetails
userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

// userDetails Update
userRouter.put(
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
    }
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser),
    });
  })
);

userRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    // // this function admin cannot delete user
    // if (user.isAdmin === true) {
    //   res.status(400).send({ message: 'Cannot Delete Admin User' });
    //   return;
    // }
    if (user) {
      const deleteUser = await user.remove;
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
