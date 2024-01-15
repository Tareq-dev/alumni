import stripe from "stripe";

const stripeSecretKey =
  "sk_test_51OYkaUKD2nUbbLbi71971sDi7RLCCy0l9h5gVKXHGYMEC8UOvlTODDs8zo5Kfy9a1abjnQgUaazNwskgs7N6zw8L00wQMrGjB2";
const stripeInstance = stripe(stripeSecretKey);

const payment = async (req, res) => {
  const event = req.body;
  const price = event.events.price * 100;
  const title = event.events.title;
  const lineItems = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: title,
        },
        unit_amount: price,
      },
      quantity: 1,
    },
  ];

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `http://localhost:5173/success`,
    cancel_url: `http://localhost:5173/cancel`,
  });

  res.json({ id: session.id });
};

export { payment, stripeInstance };
