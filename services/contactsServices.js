import * as fs from "node:fs/promises";
import path from "node:path";
const contactsPath = path.resolve("bd", "contacts.json");

const writeContacts = (contacts) => {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
};
const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactInd = contacts.findIndex((contact) => contact.id === contactId);
  const contact = contacts[contactInd];
  contacts.splice(contactInd, 1);

  await writeContacts(contacts);
  return contact || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await writeContacts(contacts);
  return newContact;
};

export { listContacts, getContactById, removeContact, addContact };
