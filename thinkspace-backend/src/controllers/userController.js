const User = require("../models/User");

const saveDeviceToken = async (req, res) => {
    try {
        const { userId, deviceToken } = req.body;

        // Check if both fields are provided
        if (!userId || !deviceToken) {
            return res.status(400).json({ message: "User ID and Device Token are required." });
        }

        // Validate device token format (example regex)
        const isValidDeviceToken = /^[a-zA-Z0-9]{64}$/.test(deviceToken);
        if (!isValidDeviceToken) {
            return res.status(400).json({ message: "Invalid device token format." });
        }

        // Find user in the database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Save device token
        user.deviceToken = deviceToken;
        await user.save();

        // Respond with success message
        res.status(200).json({ message: "Device token saved successfully.", user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { saveDeviceToken };
