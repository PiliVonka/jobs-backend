import Job from "../../models/job.mjs";

export default {
  Query: {
    jobs: async (root, args, context, info) => {
      let filter = {};
      if (args.searchValue) {
        filter = { title: { $regex: args.searchValue, $options: "i" } };
      }
      const jobs = await Job.find(filter).sort({ created: -1 }).limit(100);
      return jobs;
    },
    job: (root, args, context, info) => Job.findById(args.id),
  },
  Mutation: {
    addJob: async (root, args, context, info) => {
      const existJob = await Job.findOne({ title: args.title, description: args.description });
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
