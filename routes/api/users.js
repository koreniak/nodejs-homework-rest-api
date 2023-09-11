const express = require('express');
const ctrl = require('../../controllers/users');
const { validateBody, authenticate, upload } = require('../../middlewares');
const { schemas } = require('../../models/user');

const router = express.Router();

router.post('/register', validateBody(schemas.registerValidateSchema), ctrl.register);

router.post('/login', validateBody(schemas.loginValidateSchema), ctrl.login);

router.post('/logout', authenticate, ctrl.logout);

router.get('/current', authenticate, ctrl.current);

router.patch('/subscription', authenticate, validateBody(schemas.updateSubscriptionSchema), ctrl.updateSubscription);

router.patch('/avatars', authenticate, upload.single("avatar"), ctrl.updateAvatar);

router.get('/verify/:verificationToken', ctrl.verifyEmail);

router.post('/verify', validateBody(schemas.verifyValidateSchema), ctrl.resendVerifyEmail);

module.exports = router;