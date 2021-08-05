const Stripe = require('stripe');
const Tour = require('../models/tourModel');
const Booking = require('../models/bookingModel');
const catchAsync = require('../utils/catchAsync');
//import factory from './handlerFactory';
const factory = require('./handlerFactory');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
    //1) Get currently booked tour
    const tour = await Tour.findById(req.params.tourId);
    console.log(tour);

    //2) Create checkout getCheckoutSession
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/?tour=${
            req.params.tourId
        }&user=${req.user.id}&price=${tour.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                name: `${tour.name} Tour`,
                description: tour.summary,
                images: [
                    `https://www.natours.dev/img/tours/${tour.imageCover}`,
                ],
                amount: tour.price * 100,
                currency: 'usd',
                quantity: 1,
            },
        ],
    });
    //3) Create session as response
    res.status(200).json({
        status: 'success',
        session,
    });
});

exports.createBookingCheckout = catchAsync(async (req, res, next) => {
    // This is a temporary work-around because it's unsecure, everyone could make a booking without paying(just typing the url we're "hiding" by redirrecting)
    const { tour, user, price } = req.query;
    if (!tour || !user || !price) {
        return next();
    }
    await Booking.create({ tour, user, price });
    console.log(
        'Original URL (req.originalUrl) looks like this: ' + req.originalUrl
    );
    res.redirect(`${req.protocol}://${req.get('host')}`);
});

exports.getAllBookings = factory.getAll(Booking);

exports.getBooking = factory.getOne(Booking);

exports.createBooking = factory.createOne(Booking);

exports.updateBooking = factory.updateOne(Booking);

exports.deleteBooking = factory.deleteOne(Booking);
