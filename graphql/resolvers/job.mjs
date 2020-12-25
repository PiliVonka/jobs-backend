import Job from "../../models/job.mjs";

export default {
  Query: {
    jobs: async (root, args, context, info) => {
      let filter = {};
      if (args.searchValue) {
        const regexObj = { $regex: args.searchValue, $options: "i" };
        filter = { title: regexObj, location: regexObj };
      }
      const jobs = await Job.find(filter).sort({ created: -1 }).skip(args.skip).limit(10);
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
