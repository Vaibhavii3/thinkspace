const webPush = require('web-push');

webPush.setVapidDetails(
    'mailto:your-email@example.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
);

const sendNotification = (subscription, payload) => {
    return webPush.sendNotification(subscription, JSON.stringify(payload));
};

module.exports = { sendNotification };
