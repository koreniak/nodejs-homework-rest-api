const { Contact } = require('../models/contact');
const { HttpError, ctrlWrapper } = require('../helpers');

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, per_page: limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const limitContacts = await Contact.find({ owner }, "-createdAt -updatedAt", { skip, limit }).populate("owner", "email subscription");
  const allContacts = await Contact.find({owner}, "-createdAt -updatedAt").populate("owner", "email subscription");

  res.json({
    page,
    per_page: limit,
    contacts: limitContacts,
    total_contacts: allContacts.length,
  }); 
};

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const contactById = await Contact.findById(contactId, "-createdAt -updatedAt");
  if (!contactById) {
    throw HttpError(404);
  };

  res.json(contactById);
};

const postContact = async (req, res) => {
  const { _id: owner } = req.user;
  const {id, name, email, phone, favorite} = await Contact.create({...req.body, owner});

  res.status(201).json({id, name, email, phone, favorite});
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndRemove(contactId);
  if (!removedContact) {
    throw HttpError(404);
  };

  res.json({ message: "contact deleted" })
};

const putContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!updatedContact) {
    throw HttpError(404);
  };

  res.json(updatedContact);
};

const patchContact = async (req, res, next) => {
  const { contactId } = req.params;
  const updateStatusContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true});
  if (!updateStatusContact) {
    throw HttpError(404);
  };

  res.json(updateStatusContact);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getByIdContact: ctrlWrapper(getByIdContact),
  postContact: ctrlWrapper(postContact),
  deleteContact: ctrlWrapper(deleteContact),
  putContact: ctrlWrapper(putContact),
  patchContact: ctrlWrapper(patchContact),
};