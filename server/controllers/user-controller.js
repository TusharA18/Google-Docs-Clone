import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
   try {
      const { sub } = req.body;

      const user = await User.find({ sub });

      let token;

      if (Object.keys(user).length !== 0) {
         token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET);

         return res
            .status(200)
            .json({ msg: "User found", data: { token, user: user[0] } });
      }

      let newUser = await User.create(req.body);

      token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

      await newUser.save();

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
