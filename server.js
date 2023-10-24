import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: "public" });
});
app.get('/success', (req, res) => {
    res.sendFile('success.html', { root: "public" });
});
app.get('/cancel', (req, res) => {
    res.sendFile('cancle.html', { root: "public" });
});

let stripeGateway = Stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;
app.post('/checkout', async (req, res) => {
    const lineitems = req.body.items.map((item) => {
        const unitAmount = parseInt(item.price.replace(/[^0-9-]+/g, "")*100);
        console.log('item-price', item.price);
        console.log("unitAmount:", unitAmount);
        return {
            price_data: {
                currency: 'inr',
            
                product_data: {
                    name: `${item.title} - Size: ${item.size}`,
                    images: [item.image]
                },
                unit_amount: unitAmount
                },
            
            quantity: item.quantity,
        }
    });
    console.log('lineItems:', lineitems);
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancle`,
        line_items: lineitems,
        billing_address_collection: 'required',
        phone_number_collection: {
            enabled : true,
        }
    });
    res.json(session.url);
});
let PORT = process.env.PORT || 10000
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})