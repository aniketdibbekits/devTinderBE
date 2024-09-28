const adminAuth = (req, res, next) => {
  const token = "xyza";
  const isAuthorised = token === "xyz";
  if (!isAuthorised) {
    res.status(401).send("unauthorised");
  } else {
    next();
  }
};

module.exports = adminAuth;
