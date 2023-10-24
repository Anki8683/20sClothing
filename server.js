import express from 'express';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import cors from 'cors';
import path from 'path'

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname,'./public')));
app.use(express.json());
app.use(cors())
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/success', (req, res) => {
    res.sendFile(path.join(__dirname, './public/success.html'));
});

app.get('/cancel', (req, res) => {
    res.sendFile(path.join(__dirname, './public/cancel.html'));
});

let stripeGateway = Stripe(process.env.stripe_api);
let DOMAIN = process.env.DOMAIN;
app.post('/checkout', async (req, res) => {
    const lineitems = req.body.items.map((item) => {
        const unitAmount = parseInt(item.price.replace(/[^0-9-]+/g, "")*100);
        
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
    
    const session = await stripeGateway.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        success_url: `${DOMAIN}/success`,
        cancel_url: `${DOMAIN}/cancel`,
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