const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // verify the token
  try {
    jwt.verify(token, 'jwtSecret', (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid' });
      } else {
        req.user = decoded.user;

        next();
      }
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
