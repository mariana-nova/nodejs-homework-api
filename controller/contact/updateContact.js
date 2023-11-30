const models = require('../../models/contacts');

const updateContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: 'Missing field ' });
    }

    const { success, result, message } = await models.updateContact(contactId, body);

    return res.status(success ? 200 : 404).json({ result, message });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { updateContact };
