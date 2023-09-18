import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
   const token = req.body.token;

   if (!token) {
      return res.status(403).json({ msg: "A token is required!" });
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
   } catch (error) {
      return res.status(401).json({ msg: "Invalid Token", err: error.message });
   }

   return next();
};
