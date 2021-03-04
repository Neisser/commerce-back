const store = require('../stores')
const response = require('../../network/utils/response')
const { addInvoice } = require('./invoices')
const { verifyCoupons, updateCoupons } = require('../controllers/coupons')
const stripe = require('stripe')('sk_test_51IODw2E6FgZOY8CyEmVc6n3P7mQLpy8eiIJX57iuHq7gJ8HhRmTdqov3KilheEmtHhQ3p1frfVEgBhZ6J1y7no4400ZnGAOfq0');



const addMethodPayment = async (req, res, next) => {
    try {

        const coupon = await stripe.coupons.create({
            percent_off: 20,
            duration: 'once',
        });


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Stubborn Attachments',
                            images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `https://example.com//success.html`,
            cancel_url: `https://example.com//cancel.html`,
        })

        // Find your endpoint's secret in your Dashboard's webhook settings
        const endpointSecret = 'whsec_...';

        const fulfillOrder = (session) => {
            // TODO: fill me in
            console.log("Fulfilling order", session);

            const amountShipping = session.total_details.amount_shipping;
            console.log("Got shipping amount", amountShipping);
        }

        const payload = req.body;
        const sig = req.headers['stripe-signature'];

        let event;

        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        // Handle the checkout.session.completed event
        if (event.type === 'checkout.session.completed') {
            const session = event.data.object;

            // Fulfill the purchase...
            fulfillOrder(session);
        }

        res.status(200);
    } catch (err) {
        next(err)
    }
}

const paymentsEx = async (req, res, next) => {

    try {

    } catch (err) {
        next(err)
    }
}

module.exports = {
    addMethodPayment,
    paymentsEx
}