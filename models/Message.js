var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    Person_n : {type: String, require : true, trim : true},
    title: {type: String, required: true, trim: true},
    content: {type: String, required: true, trim: true},
    country: {type: String, required: true, trim: true},
    address: {type: String, required: true, trim: true},
    price: {type: String, required: true, trim: true},
    createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Message = mongoose.model('Message', schema);

module.exports = Message;