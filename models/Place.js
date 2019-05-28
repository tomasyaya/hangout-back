const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const placeSchema = new Schema({
  creator: {
    type: ObjectId,
    require: true,
    ref: 'Guide'
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  location: {
    type: String
  },
  comments: [
    {
      creator: {
        type: ObjectId,
        ref: 'User'
      },
      comment: String
    }
  ],
}
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;