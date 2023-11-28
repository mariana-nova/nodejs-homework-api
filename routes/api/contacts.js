const express = require('express');
const models = require('../../models/contacts');
const { nanoid } = require('nanoid');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const data = await models.listContacts();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await models.getContactById(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const newContact = {
      id: nanoid(),
      ...req.body,
    };

    const data = await models.addContact(newContact);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { success, result, message } = await models.removeContact(id);
    return res.status(success ? 200 : 404).json({ result, message });
  } catch (error) {
    console.error('Error in delete route:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: 'Missing fields' });
    }

    const { success, result, message } = await models.updateContact(
      contactId,
      body
    );

    return res.status(success ? 200 : 404).json({ result, message });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
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
});

module.exports = router;
