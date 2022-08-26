const jwt = require('jsonwebtoken');
require('dotenv').config();
var cookieParser = require('cookie-parser');


module.exports = (req, res, next) => {
    const token = req.cookie("");
    console.log(token)
    if (!token) {
      return res.sendStatus(403);
    }
    try {
      const data = jwt.verify(token, process.env.SECRET_TOKEN);
      req.userId = data.id;
      
      next();
    } catch {
      return res.sendStatus(403);
    }
  };
  