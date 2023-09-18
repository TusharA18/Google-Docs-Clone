import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   photo: {
      type: String,
   },
   sub: {
      type: String,
      required: true,
   },
});

const User = mongoose.model("user", userSchema);

export default User;
