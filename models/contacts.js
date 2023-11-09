const { writeFile } = require('fs');
const fs = require('fs/promises');
const path = require("path");
const contacts = path.join(__dirname,"./contacts.json");


const listContacts = async () => {
  try {
    const result = (await fs.readFile(contacts)).toString();

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

const removeContact = async (contactId) => {}

const addContact = async (body) => {
  try{
  const contacts = await listContacts();
  contacts.push(body)
  fs.writeFile(contactspath, JSON.stringify(contacts, null, 2))
  return body

  } catch(error){
    console.log(error)
  }
}

const updateContact = async (contactId, body) => {}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
