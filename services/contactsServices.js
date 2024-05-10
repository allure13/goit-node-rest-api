import { Contact } from "../models/contactModels.js";

const listContacts = async () => {
  Contact.find();
};

const getContactById = async (contactId) => {
  Contact.findOne({ _id: contactId });
};

const removeContact = async (contactId) => {
  Contact.findOneAndRemove({ _id: contactId });
};

const addContact = async (name, email, phone) => {
  Contact.create({ name, email, phone });
};

const updContact = async (id, data) => {
  Contact.findOneAndUpdate({ _id: id }, data, { new: true });
};

export { listContacts, getContactById, removeContact, addContact, updContact };
