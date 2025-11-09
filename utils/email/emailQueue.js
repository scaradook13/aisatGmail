const { Queue, Worker } = require("bullmq");
const sendEmail = require("./sendEmail");

// ✅ Use environment variable instead of hard-coded credentials
const redisURL = process.env.REDIS_URL;

// ✅ Parse Redis URL
const redisOptions = {
  url: redisURL,
  socket: {
    tls: true, // ✅ Required for Redis Cloud SSL
  }
};

// 📨 Create the queue
const emailQueue = new Queue("emailQueue", {
  connection: redisOptions,
});

// ⚙️ Worker that processes jobs
const emailWorker = new Worker(
  "emailQueue",
  async (job) => {
    const { email, subject, templatePath, templateData } = job.data;
    await sendEmail(email, subject, templatePath, templateData);
  },
  {
    connection: redisOptions,
  }
);

// ✅ Debug logs
emailWorker.on("completed", (job) => {
  console.log(`✅ Email sent to ${job.data.email}`);
});

emailWorker.on("failed", (job, err) => {
  console.error(`❌ Email failed for ${job.data.email}:`, err);
});

module.exports = emailQueue;
