import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
   try {
      const { sub } = req.body;

      const user = await User.findOne({ sub });

      let token;

      if (user) {
         token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

         user._id = undefined;
         user.sub = undefined;
         user._v = undefined;

         return res
            .status(200)
            .json({ msg: "User found", data: { token, user: user } });
      }

      let newUser = await User.create(req.body);

      token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      await newUser.save();

      newUser._id = undefined;
      newUser.sub = undefined;
      newUser._v = undefined;

      return res
         .status(200)
         .json({ msg: "New user created", data: { token, newUser } });
   } catch (error) {
      res.status(400).json({
         msg: "Invalid Creds!",
         error: error.message,
      });
   }
};
