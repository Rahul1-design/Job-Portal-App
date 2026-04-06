import { Application } from '../models/application.model.js';
import { Job } from '../models/job.model.js';

export const applyjob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({
        message: 'JobId is required.',
        success: false,
      });
    }

    // checking if the user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied to this job.',
        success: false,
      });
    }

    // check if job exist or not
    const job = await Job.findById(jobId);
    if (!job) {
      return res
        .status(400)
        .status({ message: 'Job not found.', success: false });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    job.applications.push(newApplication._id);
    await job.save();

    return res
      .status(201)
      .json({ message: 'Job applied successfully', success: true });
  } catch (error) {
    console.log(error);
  }
};
