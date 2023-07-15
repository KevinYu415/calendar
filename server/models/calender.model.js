const mongoose = require("mongoose");

const CalenderSchema = {
  title: {
    type: String,
    required: [true, "Title must be at least 2 characters"],
    minLength: [2, "Title must be at least 2 characters"],
  },
  body:{
    type: String,
    required: [true, "Body must contain max of 255 characters"],
    maxLength: [255, "Body must contain max of 255 characters"],
  },
  start:{
    type: Date,
    required: [true, "Please Insert The Start of your event" ],
  },
  end:{
    type: Date,
    required: [true, "Please Insert The end of your event" ],
  }
  // ,
  // starttime:{
  //   type: String,
  //   required: [true, "Please Insert The Start Time of your event" ],
  // },
  // endtime:{
  //   type: String,
  //   required: [true, "Please Insert The end Time of your event" ],
  // }
};

module.exports = mongoose.model("Calender", CalenderSchema);