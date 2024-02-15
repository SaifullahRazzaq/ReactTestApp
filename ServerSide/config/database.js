const mongoose = require("mongoose");
exports.connect = () => {
    // Connecting to the database
    mongoose.set("strictQuery", false);
    mongoose.connect(uri)
        .then(() => {
            console.log("Successfully connected to database");
        })
        .catch((error) => {
            console.log("database connection failed. exiting now...");
            console.error(error);
            process.exit(1);
        });
};
