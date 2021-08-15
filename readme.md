# Natour app

A study project to node.js. I built it following Udemy course (https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/) by Jonas Schmedtmann

Tech used: node.js, express, mongoDB, mongoose and many more 😊

## Link to live version: https://natours-by-akseli.herokuapp.com/

## Testing the app
At the moment the signing in is not enabled in the live version but you can test the app using for example following users:
  - Regular users:
    - email: monica@example.com, password: test1234
    - email: max@example.com, password: test123
  - Admin:
    - email: admin@natours.io, password: test1234
 
After loggin in you can change name, email and even upload a new profile picture. Also as a user it is possible to buy (in test mode) tours and look at your own bookings (bought tours). Payment is made with Stripe and to test it you can use creditcard number 4242 4242 4242 4242 and make up the other card info. Expiration date needs to be in future naturally.
