import mongoose, { model, models, Schema } from 'mongoose';

const companySchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    website: { type: String },
    location: { type: String },
    logo: { type: String }, // URL to company logo
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

export const Company = models.Company || model('Company', companySchema);
