var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  title: {type: String, required: true, trim: true},
  content: {type: String, required: true, trim: true},
  country: {type: String, required: true, trim: true},
  address: {type: String, required: true, trim: true},
  price: {type: String, required: true, trim: true},
  service: {type: String, required: true, trim: true},
  rule: {type: String, required: true, trim: true},
  read: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;