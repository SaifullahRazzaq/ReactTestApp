const mongoose = require("mongoose");
exports.connect = () => {
    mongoose.connect('mongodb+srv://saifullahrazzaq1995:W2Mgav4laFVCPv9H@cluster0.eixrpor.mongodb.net/?retryWrites=true&w=majority',);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        console.log('Database connected successfully');
    });
};
