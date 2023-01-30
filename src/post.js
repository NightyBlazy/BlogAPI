const mongoose = require('mongoose')    

const blogSchema = mongoose.Schema({
  title : {type: String, required: true},
  body : {type: String, required: true},
  preview : {type: String, required: true},
  author : {type: String, required: true},
  date : {type: String, required: true}
})

module.exports = mongoose.model('blogs', blogSchema);