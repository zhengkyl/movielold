import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.jwtSecret);

    req.user = decodedToken.user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ message: err.message })
  }
};

export default isAuth;
