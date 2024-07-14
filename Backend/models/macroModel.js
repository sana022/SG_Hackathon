const mongoose = require('mongoose');

const macroSchema = new mongoose.Schema({
  name: String,
  content: String,
  documentation: String,
  transformedCode: String,
});

const Macro = mongoose.model('Macro', macroSchema);

module.exports = Macro;
