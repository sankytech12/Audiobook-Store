const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token = "";
  token = req.query.token;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }
  // if(req.cookies.token) {
  //     try{
  //         token=req.cookies.token;
  //         const decoded=jwt.verify(token, process.env.JWT_SECRET);

  //         req.user=await User.findById(decoded.id).select('-password');

  //         next();
  //     }catch(error){
  //         res.status(401).json({message: 'Not authorized, token failed'});
  //     }
  // }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
