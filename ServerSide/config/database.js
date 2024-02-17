const mongoose = require("mongoose");
exports.connect = () => {
    mongoose.connect('',);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Database connected successfully');
    });
};
