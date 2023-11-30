const models = require('../../models/contacts');

const removeContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { success, result, message } = await models.removeContact(id);
    return res.status(success ? 200 : 404).json({ result, message });
  } catch (error) {
    console.error('Error in delete route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { removeContact };
