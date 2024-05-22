import HttpError from "../helpers/HttpError.js";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const contacts = await listContacts(owner);

    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const contact = await getContactById(id, owner);
    if (contact) {
      res.json(contact);
    } else {
      throw HttpError(404, "Contact not found");
    }
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const deletedContact = await removeContact(id, owner);
    if (deletedContact) {
      res.json(deletedContact);
    } else {
      throw HttpError(404, "Contact not found");
    }
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const newContact = await addContact({ ...req.body, owner: req.user._id });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const updatedContact = await updContact(id, owner, req.body);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      throw HttpError(404, "Contact not found");
    }
  } catch (error) {
    next(error);
  }
};

export const updateFavoriteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;

    const updatedContact = await updContact(id, owner, req.body);
    if (!updatedContact) throw HttpError(404, "Contact not found");

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
};
