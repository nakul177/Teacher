require("dotenv").config();
const jwt = require("jsonwebtoken");



const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, admin) => {
      if (err) return reject(err);

      resolve(admin);
    });
  });
};

module.exports = async (req, res, next) => {
 
  if (!req.headers.authorization)
    return res.status(400).send({
      message: "authorization token was not provided or was not valid",
    });


  if (!req.headers.authorization.startsWith("Bearer "))
    return res.status(400).send({
      message: "authorization token was not provided or was not valid",
    });

  
  const token = req.headers.authorization.split(" ")[1];


  let admin;

  try {
    admin = await verifyToken(token);
  } catch (err) {
    return res.status(400).send({
      message: "authorization token was not provided or was not valid",
    });
  }

 
  req.admin = admin.admin;

  return next();
};
