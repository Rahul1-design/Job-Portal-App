import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;
const applicationSchema = new Schema(
  {
    job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Application =
  models.Application || model('Application', applicationSchema);
