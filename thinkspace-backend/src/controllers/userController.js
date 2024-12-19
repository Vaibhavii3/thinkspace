// const User = require("../models/User");

// const saveDeviceToken = async (req, res) => {
//     try {
//         const { userId, deviceToken } = req.body;

//         if (!userId || !deviceToken) {
//             return res.status(400).json({ message: "User ID and Device Token are required." });
//         }

//         const user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).json({ message: "User not found." });
//         }

//         user.deviceToken = deviceToken;
//         await user.save();

//         res.status(200).json({ message: "Device token saved successfully." });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = { saveDeviceToken };
