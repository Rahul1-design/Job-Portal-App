import mongoose, { model, models, Schema } from 'mongoose';

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, requried: true },
    requirements: [{ type: String, required: true }],
    salary: { type: Number, required: true },
    location: { type: String, required: true },
    jobType: { type: String, required: true },
    position: { type: Number, required: true },
    comapny: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company',
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    application: { type: mongoose.Schema.Types.ObjectId, ref: 'Application' },
  },
  { timestamps: true }
);

export const Job = models.Job || model('Job', jobSchema);
