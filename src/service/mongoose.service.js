const mongoose = require('mongoose');
var uri = process.env.URL;

//connection à la base de données
exports.dbConnect = () => {
    mongoose.connect(uri)
    .then(() => {
        console.log("successfully connected to the database")
    }).catch(err => {
        console.log("couldnt connect to the database", err);
        process.exit();
    })
}