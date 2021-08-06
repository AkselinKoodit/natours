const Stripe = require('stripe');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
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
        // success_url: `${req.protocol}://${req.get('host')}/?tour=${
        //     req.params.tourId
        // }&user=${req.user.id}&price=${tour.price}`,
        success_url: `${req.protocol}://${req.get('host')}/my-tours`,
        cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tourId,
        line_items: [
            {
                name: `${tour.name} Tour`,
                description: tour.summary,
                images: [
                    `${req.protocol}://${req.get('host')}/img/tours/${
                        tour.imageCover
                    }`,
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

// exports.createBookingCheckout = catchAsync(async (req, res, next) => {
//     // This is a temporary work-around because it's unsecure, everyone could make a booking without paying(just typing the url we're "hiding" by redirrecting)
//     const { tour, user, price } = req.query;
//     if (!tour || !user || !price) {
//         return next();
//     }
//     await Booking.create({ tour, user, price });

//     res.redirect(`${req.protocol}://${req.get('host')}`);
// });

const createBookingCheckout = async (session) => {
    const tour = sessionId.client_reference_id;
    const user = (await User.findOne({ email: session.customer_email })).id;
    const price = session.display_items[0].amount / 100;
    await Booking.create({ tour, user, price });
};

exports.webhookCheckout = (req, res, next) => {
    const signature = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send('Webhook error: ${err.message}');
    }

    if (event.type === 'checkout.session.completed')
        createBookingCheckout(event.data.object);
    res.status(200).json({ received: true });
};

exports.getAllBookings = factory.getAll(Booking);

exports.getBooking = factory.getOne(Booking);

exports.createBooking = factory.createOne(Booking);

exports.updateBooking = factory.updateOne(Booking);

exports.deleteBooking = factory.deleteOne(Booking);
