// /server/controllers/fieldsController.js
const Fields = require('../models/Fields'); // Ensure the path is correct

// List all fields
exports.listFields= async (req, res) => {
    const field = await Fields.list();
    res.send(field);
  };


exports.findField = async (req, res) => {
    const { id } = req.params;
  
    const field = await Fields.find(id);
    if (!field) return res.sendStatus(404);
  
    res.send(field);
  };
