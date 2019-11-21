import { Schema, model } from "mongoose";

const ToolSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [String]
});

export default model("Tool", ToolSchema);
