import e from "express";
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
    const contacts = await listContacts();

    res.json({
      status: "success",
      code: 200,
      data: { contacts },
    });
  } catch (error) {
    next(HttpError(500));
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: { contact },
      });
    } else {
      const err = HttpError(404);
      res.status(err.status).json({
        message: err.message,
      });
    }
  } catch (error) {
    next(HttpError(500));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedContact = await removeContact(id);
    if (deletedContact) {
      res.json({
        status: "success",
        code: 200,
        data: { deletedContact },
      });
    } else {
      const err = HttpError(404);
      res.status(err.status).json({
        message: err.message,
      });
    }
  } catch (error) {
    next(HttpError(500));
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json({
      status: "created",
      code: 201,
      data: { newContact },
    });
  } catch (error) {
    next(HttpError(500));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedContact = await updContact(id, req.body);
    console.log(updatedContact);
    if (updatedContact) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: { updatedContact },
      });
    } else {
      const err = HttpError(404);
      res.status(err.status).json({
        message: err.message,
      });
    }
  } catch (error) {
    next(HttpError(500));
  }
};
