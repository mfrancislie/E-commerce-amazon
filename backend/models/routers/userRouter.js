import express from 'express';
import data from '../../data.js';
import User from '../userModel.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // instead remove({}) im using this deleteMany({})
    // if i refresh it just deleted all users and created users with different id.
    await User.deleteMany({});

    const createdUsers = await User.insertMany(data.users);
    res.send({ createdUsers });
  })
);

export default userRouter;
