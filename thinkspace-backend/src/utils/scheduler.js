const cron = require("node-cron");
const nodemailer = require("nodemailer");
const Task = require("../models/Task.js");
const User = require("../models/User.js")
const mongoose = require("mongoose");

// Run every minute (for demo; you can adjust it)
cron.schedule("* * * * *", async () => {
  const now = new Date();
  const nowISO = now.toISOString();

  const tasks = await Task.find({
    emailReminder: true,
    completed: false,
    date: { $lte: new Date(nowISO.split("T")[0]) },
  });

  for (const task of tasks) {
    // Check time match (e.g., within same hour/minute)
    if (!task.time) continue;

    const taskHour = parseInt(task.time.split(":")[0], 10);
    const taskMinute = parseInt(task.time.split(":")[1], 10);

    if (now.getHours() === taskHour && now.getMinutes() === taskMinute) {
      const user = await User.findById(task.userId);

      if (user && user.email) {
        const transporter = nodemailer.createTransport({
          service: "Gmail",
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.MAIL_USER,
          to: user.email,
          subject: "Task Reminder",
          text: `Reminder: ${task.description} scheduled at ${task.time}`,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) console.error("Email failed:", err);
          else console.log("Reminder sent:", info.response);
        });
      }
    }
  }
});
