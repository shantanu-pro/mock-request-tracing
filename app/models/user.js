const mongoose = require("mongoose");
const mongooseAsyncHooks = require('@mongoosejs/async-hooks');

const Schema = mongoose.Schema;

let user = new Schema(
  {
    name: {
      type: String
    },
    age: {
      type: Number
    },
    location: {
      type: String
    }
  },
  { collection: "Employees" }
);

user.plugin(mongooseAsyncHooks);

module.exports = mongoose.model("employees", user);