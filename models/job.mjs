import mongoose from "mongoose";

const { Schema, model } = mongoose;

const JobSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  jobDate: {
    type: String,
    required: false
  },
  location: {
    type: String,
    required: true
  },
  created: {
    type: Date,
    default: Date.now
  }
});

const Job = model("Job", JobSchema);
export default Job;
