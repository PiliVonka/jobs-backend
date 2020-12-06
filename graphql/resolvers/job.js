import Job from "../../models/job";

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
      const job = await Job.create({
        ...args
      });
      return job;
    },
  },
};
