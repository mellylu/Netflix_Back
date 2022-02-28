// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')('sk_test_51KHlAcApycYj76sx6fysVoOPR551Ckuu8gRu8S4toPU6Rvu1wWEcjiyY6z71drC03GvtKGEB43pWfjVSm8aA36Lr009WbKxiT6');

// The price ID passed from the client
//   const {priceId} = req.body;
const priceId = '{{PRICE_ID}}';

const session = await stripe.checkout.sessions.create({
  mode: 'subscription',
  line_items: [
    {
      price: priceId,
      // For metered billing, do not pass quantity
      quantity: 1,
    },
  ],
  // {CHECKOUT_SESSION_ID} is a string literal; do not change it!
  // the actual Session ID is returned in the query parameter when your customer
  // is redirected to the success page.
  success_url: 'https://example.com/success.html?session_id={CHECKOUT_SESSION_ID}',
  cancel_url: 'https://example.com/canceled.html',
});
