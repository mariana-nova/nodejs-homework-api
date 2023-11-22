const { writeFile } = require('fs');
const fs = require('fs/promises');
const path = require("path");
const contactspath = path.join(__dirname,"./contacts.json");


const listContacts = async () => {
  try {
    const result = (await fs.readFile(contactspath)).toString();

    return JSON.parse(result);
  } catch (error) {
    console.log(error)
  }
}

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.filter(index => index.id == contactId)

    return contact
  } catch (error) {
    console.log("contact not found")
  }
}

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex(c => c.id == contactId);
    if (contactIndex !== -1) {
      const removedContact = contacts.splice(contactIndex, 1)[0];
      await fs.writeFile(contactspath, JSON.stringify(contacts, null, 2));
      return {
        success: true,
        result: removedContact,
        message: 'The contact was deleted successfully.',
      };
    } else {
      return {
        success: false,
        result: null,
        message: 'Contact not found.',
      };
    }
  } catch (error) {
    return {
      success: false,
      result: null,
      message: error,
    };
  }
}

const addContact = async (body) => {
  try{
  const contacts = await listContacts();
  contacts.push(body);
  fs.writeFile(contactspath, JSON.stringify(contacts, null, 2))
  return body;

  } catch(error){
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contactIndex = contacts.findIndex((c) => c.id == contactId);

    if (contactIndex !== -1) {
      const updatedContact = { ...contacts[contactIndex], ...body };
      contacts[contactIndex] = updatedContact;

      await fs.writeFile(contactspath, JSON.stringify(contacts, null, 2));
      return {
        success: true,
        result: updatedContact,
        message: "The contact was updated successfully.",
      };
    } else {
      return {
        success: false,
        result: null,
        message: "Contact not found.",
      };
    }
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
}

