import { Document, model, Schema } from 'mongoose';

export interface Job {
  _id: string;
  queueId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type JobModel = Job & Document;

const jobSchema = new Schema(
  {
    queueId: String
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: true
    },
    versionKey: false
  }
);

export const jobModel = model<JobModel>(
  'Job',
  jobSchema,
  'Job'
);
