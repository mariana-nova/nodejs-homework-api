const express = require('express')
const models = require ('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const data = await models.listContacts()
  
  res.status(200).json(data)
})


router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const data = await models.getContactById(id)
  res.status(200).json(data)
})

router.post('/', async (req, res, next) => {
  const {name,email,phone} = req.body;
  const newContacts ={
    id : 123,
    name,
    email,
    phone,
  };
  const data = await models.addContact(newContacts);

  res.status(201).json(data)
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
