const express = require('express');
const ctrl = require('../../controllers/users');
const { validateBody, authenticate, isValidUserId } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();


router.post('/register', validateBody(schemas.registerJoiSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginJoiSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/:userId/subscription', authenticate, isValidUserId, validateBody(schemas.updateSubscriptionSchema), ctrl.patchSubscription)


module.exports = router;