const models = require('../../models/contacts'); 
const contactValidation = require('../../models/contactValidation');

const addContact = async (req, res, next) => {
  try {
    const { error, value } = contactValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const nuevoContacto = {
      ...value,
    };

    const data = await models.addContact(nuevoContacto);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = { addContact };
