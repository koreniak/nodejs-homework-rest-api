const express = require('express');
const ctrl = require('../../controllers/contacts');
const { validateBody, isValidId, authenticate } = require('../../middlewares');
const { schemas } = require('../../models/contact');

const router = express.Router();

router.get('/', authenticate, ctrl.getAllContacts);

router.get('/:contactId', authenticate, isValidId, ctrl.getByIdContact);

router.post('/', authenticate, validateBody(schemas.contactJoiSchema), ctrl.postContact);

router.delete('/:contactId', authenticate, isValidId, ctrl.deleteContact);

router.put('/:contactId', authenticate, isValidId, validateBody(schemas.contactJoiSchema), ctrl.putContact);

router.patch('/:contactId/favorite', authenticate, isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.patchContact);

module.exports = router;