const express = require('express');
const router = express.Router();


const { listContacts } = require('../../controller/contact/listContacts');
const { getContactById } = require('../../controller/contact/getContactById');
const { removeContact } = require('../../controller/contact/removeContact');
const { updateContact } = require('../../controller/contact/updateContact');
const { favoriteContact } = require('../../controller/contact/favoriteContact');
const { addContact }   = require('../../controller/contact/addContact');


router.get('/', listContacts);

router.get('/:contactId', getContactById);

router.post('/', addContact );

router.delete('/:id', removeContact  );

router.put('/:contactId', updateContact );

router.patch('/:contactId/favorite', favoriteContact )


module.exports = router;