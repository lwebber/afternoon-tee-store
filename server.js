if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const fs = require('fs');
const express = require('express');
const app = express();
// Set your secret key: remember to change this to your live secret key in production
const stripe = require('stripe')(stripeSecretKey);

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
const nodeModulesDir = 'node_modules';
app.use("/node_modules", express.static(nodeModulesDir));

app.get('/store', function(req, res) {
    fs.readFile('items.json', function(error, data) {
        if (error) {
            res.status(500).end();
        } else {
            res.render('store.ejs', {
                stripePublicKey: stripePublicKey,
                items: JSON.parse(data)
            })
        }
    });
});

app.post('/purchase', function(req, res) {
    fs.readFile('items.json', function(error, data) {
        if (error) {
            res.status(500).end();
        } else {
            const itemsJson = JSON.parse(data)
            const itemsArray = itemsJson.products;
            let total = 0;
            req.body.items.forEach(function() {
                    const itemJson = itemsArray.find(function(i) {
                        return i.id == item.id;
                    })
                    total = total + itemJson.price * item.quantity
                })
                // Token is created using Stripe Checkout or Elements!
                // Get the payment token ID submitted by the form:
            const token = req.body.stripeToken; // Using Express

            (async() => {
                const charge = await stripe.charges.create({
                    amount: 999,
                    currency: 'usd',
                    description: 'Example charge',
                    source: token,
                });
            })();

        }
    });
});




app.listen(3000);