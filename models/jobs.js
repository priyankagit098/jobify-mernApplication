import mongoose from 'mongoose';
// import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
mongoose.set("strictQuery", false);

const JobSchema = new mongoose.Schema(
  {
    company:  {
        type: String,
        required: [true, "Please provide company"],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, "Please provide company"],
        maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "pending", "declined"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["part-time" ,"internship", "full-time"],
      default: "part-time",
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required:true
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required:[true, "Please provide user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model('Job', JobSchema);