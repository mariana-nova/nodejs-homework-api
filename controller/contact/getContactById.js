const models = require('../../models/contacts');

const getContactById = async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await models.getContactById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { getContactById };
