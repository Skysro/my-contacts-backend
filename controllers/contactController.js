const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//get
//private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});



//create
//private
const createNewContact = asyncHandler(async (req, res) => {
  
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("Couldn't create, all fields are required");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});



//Update
//private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  //check user permissions
  if (contact.user_id.tostring() !== req.user_id){
    res.status(403);
    throw new Error("User dont have permission to update other user's contact");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});


//getbyID
//private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});


//delete
//private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  //check user permissions
  if (contact.user_id.tostring() !== req.user_id){
    res.status(403);
    throw new Error("User dont have permission to update other user's contact");
  }
  await Contact.deleteOne({ _id: req.params.id });
  res.status(200).json(contact);
});




module.exports = {
  getContacts,
  createNewContact,
  deleteContact,
  updateContact,
  getContact,
};
