const express = require('express');
const models = require('../../models/contacts');
const { nanoid } = require("nanoid");
const router = express.Router()
const Joi = require("joi");


const schema = Joi.object({
  name: Joi.string().required(),

  phone: Joi.string().required(),

  email: Joi.string().email().required(),
});

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
  const {error,value} = schema.validate(req.body);
  if (error) {
    return res.status(400)
    .json({ message: 'Missing required name, email, or phone field' });
  }
  const newContacts ={
    id : nanoid(),
    name: value.name,
    email: value.email,
    phone: value.phone,
  };
  const data = await models.addContact(newContacts);

  res.status(201).json(data)
})

router.delete('/:id', async (req, res, next) => {
  try{
 const {id} = req.params;
 const { success, result, message} = await models.removeContact(id)
 return res.status(200).json({result, message})
  }catch(error){
    

  }
  res.json({ message: 'template message' })
})

router.put("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const body = req.body;

    if (Object.keys(body).length === 0) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const { success, result, message } = await models.updateContact(
      contactId,
      body
    );

    if (success) {
      return res.status(200).json({ result, message });
    } else {
      return res.status(404).json({ message });
    }
  } catch (error) {

    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router
