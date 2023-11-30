const models = require('../../models/contacts');

const listContacts = async (req, res, next) => {
  try {
    const data = await models.listContacts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { listContacts };
