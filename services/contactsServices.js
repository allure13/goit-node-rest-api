import { Contact } from "../models/contactModels.js";

const listContacts = async () => {
  return Contact.find();
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  return Contact.findOneAndRemove({ _id: contactId });
};

const addContact = async (name, email, phone) => {
  return Contact.create({ name, email, phone });
};

const updContact = async (id, data) => {
  return Contact.findOneAndUpdate({ _id: id }, data, { new: true });
};

export { listContacts, getContactById, removeContact, addContact, updContact };
