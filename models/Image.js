const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema


const ImageSchema = new Schema({
    path: {
        type: String
    },
    caption: {
        type: String
    }
});
// const ImageSchema = new Schema({
//      image: {
//         data: Buffer,
//         contentType: String
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     details:{
//         type: String,
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     }
// });

mongoose.model('images', ImageSchema);