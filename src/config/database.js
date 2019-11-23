import mongoose from "mongoose";

const DB = "vuttr";

export default mongoose.connect(
  `mongodb://localhost:27017/${process.env.DB_TEST || DB}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
