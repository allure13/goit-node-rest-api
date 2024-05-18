import { Contact } from "../models/contactModels.js";

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId, owner) => {
  return Contact.findOne({ _id: contactId, owner });
};

const removeContact = async (contactId, owner) => {
  return Contact.findOneAndRemove({ _id: contactId, owner });
};

const addContact = async (data) => {
  return Contact.create(data);
};

const updContact = async (id, owner, data) => {
  return Contact.findOneAndUpdate({ _id: id, owner }, data, { new: true });
};

export { listContacts, getContactById, removeContact, addContact, updContact };
