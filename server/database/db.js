import mongoose from "mongoose";

const connectToDB = () => {
   const mongo_uri = process.env.MONGO_URI;

   const options = {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   };

   try {
      mongoose.connect(mongo_uri, options).then(() => {
         console.log("DB Connected");
      });
   } catch (error) {
      console.log("Error while connecting to DB", error.message);
   }
};

export default connectToDB;
