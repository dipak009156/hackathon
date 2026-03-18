const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

const isRole = (...roles)=>{
  return (req, res, next)=>{
    if(!req.user){
      return res.status(401).json({ message: "Not authorized" });
    }

    if(!roles.includes(req.user.role)){
      return res.status(403).json({ message: "Access denied" });
    }

    next()
  }
}

module.exports = {
  isAuthorized, isRole
}