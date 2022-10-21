// In a React Native application
import Parse from "parse/react-native.js";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { APP_ID, JAVASCRIPT_KEY, SECRET_KEY ,publishable_Key} from "./env.vars";

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(APP_ID, JAVASCRIPT_KEY, SECRET_KEY, publishable_Key);
Parse.serverURL = 'https://parseapi.back4app.com/';

const express = require("express");
const app = express();
const { resolve } = require("path");
const stripe = require("stripe")(process.env.SECRET_KEY); 



app.use(express.static("."));
app.use(express.json());

// An endpoint for your checkout 
app.post("/checkout", async (req, res) => { 
  // Create or retrieve the Stripe Customer object associated with your user.
  let customer = await stripe.customers.create(); 
  
  // Create an ephemeral key for the Customer; this allows the app to display saved payment methods and save new ones
  const ephemeralKey = await stripe.ephemeralKeys.create(
    {customer: customer.id},
    {apiVersion: '2020-08-27'} 
  );  
    
  // Create a PaymentIntent with the payment amount, currency, and customer
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 973,
    currency: "eur",
    customer: customer.id,
    automatic_payment_methods: {
        enabled: true,
      },
  });
  
  // send object keys to clients
  res.send({
    publishableKey: process.env.publishable_key, 
    paymentIntent: paymentIntent.client_secret,
    customer: customer.id,
    ephemeralKey: ephemeralKey.secret
  });
});


app.listen(process.env.PORT, () =>
  console.log(`Node server listening on port ${process.env.PORT}!`)
);

export default Parse;