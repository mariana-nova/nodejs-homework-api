const models = require('../../models/contacts'); 

const favoriteContact= async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const { favorite } = req.body;

    if (favorite === undefined) {
      return res.status(400).json({ message: 'Missing field favorite' });
    }

    const updatedContact = await models.updateContact(contactId, { favorite });

    if (updatedContact.success) {
      res.status(200).json(updatedContact.result);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { favoriteContact };

