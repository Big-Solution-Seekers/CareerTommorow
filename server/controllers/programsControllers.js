// /server/controllers/fieldsController.js
const Programs = require('../models/Programs'); // Ensure the path is correct

// List all fields
exports.listPrograms = async (req, res) => {
    const program = await Programs.list();
    res.send(program);
  };


exports.findProgram = async (req, res) => {
    const { id } = req.params;
  
    const program = await Programs.find(id);
    if (!program) return res.sendStatus(404);
  
    res.send(Program);
  };
