const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const guideSchema = new Schema({
  creator: {
    type: ObjectId,
    require: true,
    ref: 'User'
  },
  title: {
    type: String
  },
  location: {
    type: String
  },
  places: [
    {
      type: ObjectId,
      ref: 'Place'
    }
  ],
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

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;