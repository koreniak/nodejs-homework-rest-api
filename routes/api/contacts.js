const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getByIdContact);

router.post('/', authenticate, validateBody(schemas.contactValidateSchema), ctrl.addContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.contactValidateSchema), ctrl.updateContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);

module.exports = router;