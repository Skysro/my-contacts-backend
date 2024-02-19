const express = require('express')
const router = express.Router();
const {getContacts, createNewContact, deleteContact,updateContact,getContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

router.use(validateToken);
router.route("/").get(getContacts).post(createNewContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);




module.exports = router;