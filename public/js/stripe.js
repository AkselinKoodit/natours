import axios from 'axios';
import { showAlert } from './alerts';

/* eslint-disable */
const stripe = Stripe(
    'pk_test_51JKngFEB4GMtvmYJaZ3WrRZueiOg6lVq5W0sT2VipFO7ZqTM1oNpnDeHFoH91n07SXriXx06YZCgucdqxvt5eB0n00wZPlyCxk'
);

export const bookTour = async (tourId) => {
    try {
        // 1) Get session from API
        const session = await axios(
            `/api/v1/bookings/checkout-session/${tourId}`
        );
        // console.log(session);
        // 2) Use stripe to create checkout form+charge the credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id,
        });
    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
};
