const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const viewController = require('../controllers/viewController');
const bookingController = require('../controllers/bookingController');

router.get('/signup', viewController.getSignupForm);

router.get(
    '/',
    bookingController.createBookingCheckout,
    authController.isLoggedIn,
    viewController.getOverview
);
router.get(`/tour/:slug`, authController.isLoggedIn, viewController.getTour);
router.get('/login', authController.isLoggedIn, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);
router.get('/my-tours', authController.protect, viewController.getMyTours);

router.post(
    '/submit-user-data',
    authController.protect,
    viewController.updateUserData
);

module.exports = router;
