// backend/controllers/macroController.js
const Macro = require('../models/macroModel');
const vbaParser = require('../utils/vbaParser');

// Upload a macro
const uploadMacro = async (req, res) => {
  try {
    const { name, content } = req.body;
    const documentation = vbaParser.generateDocumentation(content);
    const transformedCode = vbaParser.transformCode(content);

    const newMacro = new Macro({
      name,
      content,
      documentation,
      transformedCode,
    });

    await newMacro.save();
    res.json(newMacro);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload macro' });
  }
};

// Fetch all macros
const getMacros = async (req, res) => {
  try {
    const macros = await Macro.find();
    res.json(macros);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch macros' });
  }
};

module.exports = {
  uploadMacro,
  getMacros
};
