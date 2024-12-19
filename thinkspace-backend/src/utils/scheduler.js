// const schedule = require('node-schedule');
// const { sendNotification } = require('../utils/notificationService');
// const Task = require('../models/Task');

// const scheduleNotification = (task) => {
//     schedule.scheduleJob(task.date, async () => {
//         const taskFromDb = await Task.findById(task._id);
//         if (taskFromDb.notify && !taskFromDb.notificationSent) {
//             const subscription = await getUserSubscription(task.userId);
//             const payload = {
//                 title: 'Task Reminder',
//                 body: `Don't forget to complete: "${task.description}"`,
//             };

//             await sendNotification(subscription, payload);
//             taskFromDb.notificationSent = true;
//             await taskFromDb.save();
//         }
//     });
// };

// const getUserSubscription = async (userId) => {
//     const user = await User.findById(userId);
//     return user?.deviceToken;
// };


// module.exports = { scheduleNotification };
