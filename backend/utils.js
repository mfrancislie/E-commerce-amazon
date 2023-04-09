import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      isSeller: user.isSeller,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    {
      expiresIn: '30d',
    }
  );
};

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length); // the format of this example Bearir XXXXX <-token
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (error, decode) => {
        if (error) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          res.user = decode;
          // By calling next(), right after this, the pass user as a property of request to the next middleware
          next();
        }
      }
    );
  } else {
    res.status(401).send({ message: 'No Token' });
  }
};
