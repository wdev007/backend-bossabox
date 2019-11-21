import mongoose from "mongoose";

export default mongoose.connect("mongodb://localhost:27017/vuttr", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
