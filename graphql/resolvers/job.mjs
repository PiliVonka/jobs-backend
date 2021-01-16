import Job from "../../models/job.mjs";

export default {
  Query: {
    jobs: async (root, args, context, info) => {
      let filter = {};
      if (args.searchValue) {
        filter = { $text: { $search: args.searchValue } };
      }
      const skip = args.skip ? args.skip : 0;
      const limit = args.limit ? args.limit : 10;
      const jobs = await Job
        .find(filter)
        .sort({ created: -1 })
        .skip(skip).limit(limit);
      console.log({ jobs });
      return jobs;
    },
    job: (root, args, context, info) => Job.findById(args.id),
  },
  Mutation: {
    addJob: async (root, args, context, info) => {
      const existJob = await Job.findOne({ title: args.title, description: args.description, jobDate: args.jobDate });
      if (existJob) {
        throw Error("Job already exists");
      }

      const job = await Job.create({
        ...args
      });
      return job;
    },
  },
};
