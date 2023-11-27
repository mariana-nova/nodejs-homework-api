const Contact = require('../models/contactmodel');

const listContacts = async () => {
  try {
    const result = await Contact.find();
    return result;
  } catch (error) {
    console.log(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    return contact ? [contact] : [];
  } catch (error) {
    console.log('Contact not found');
  }
};

const removeContact = async (contactId) => {
  try {
    const removedContact = await Contact.findByIdAndRemove(contactId);
    return removedContact
      ? {
          success: true,
          result: removedContact,
          message: 'The contact was deleted successfully.',
        }
      : {
          success: false,
          result: null,
          message: 'Contact not found.',
        };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);
    return newContact;
  } catch (error) {
    console.log(error);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      body,
      { new: true }
    );

    return updatedContact
      ? {
          success: true,
          result: updatedContact,
          message: 'The contact was updated successfully.',
        }
      : {
          success: false,
          result: null,
          message: 'Contact not found.',
        };
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
