require('dotenv').config()

const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const { helloAPIHandler, registerUserHandler, authenticateUserHandler, registerAdditionalInfoHandler, createMealHandler, retrieveMealsHandler, retrieveUserHandler, retrieveMealHandler, retrieveOwnMealsHandler, updateMealHandler, deleteMealHandler, addMealToCartHandler, retrieveCartMealsHandler, payMealsInCartHandler, removeMealFromCartHandler, retrievePendingToPickUpHandler, incrementMealsInCartHandler, retrievePendingToDeliverHandler, markAsReadyHandler, retrieveWaitingClientToPickUpHandler, serverStatusHandler, markAsCompletedHandler, searchMealsHandler, toggleLikeChefHandler, retrieveLikedChefsHandler } = require('./handlers')

const mongoose = require('mongoose')

const ImageKit = require('imagekit');


const imagekit = new ImageKit({
    urlEndpoint: 'https://ik.imagekit.io/6zeyr5rgu/yuperApp/',
    publicKey: 'public_9DujXADbFrwoOkNd+rUmvTbT/+U=',
    privateKey: 'private_Ohzt9aum24ztTasqw/eWNiggN+4='
})

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        const api = express()

        const jsonBodyParser = bodyParser.json()

        api.use(cors())

        api.get('/', helloAPIHandler)

        api.get('/serverStatus', serverStatusHandler)

        //register user
        api.post('/users', jsonBodyParser, registerUserHandler)

        //complete info user
        api.post('/users/info', jsonBodyParser, registerAdditionalInfoHandler)

        //authenticate user
        api.post('/users/auth', jsonBodyParser, authenticateUserHandler)

        //retrieveUser
        api.get('/users', retrieveUserHandler)

        //createMeal
        api.post('/meals', jsonBodyParser, createMealHandler)

        //retrieveMeals
        api.get('/meals', retrieveMealsHandler)

        //retrieveMeal
        api.get('/meal/:mealId', retrieveMealHandler)

        //retrieveOwnMeals
        api.get('/meals/user/', retrieveOwnMealsHandler)

        //updateMeal
        api.post('/meals/update/:mealId', jsonBodyParser, updateMealHandler)

        //deleteMeal
        api.post('/meals/delete/:mealId', deleteMealHandler)

        //add meal to cart
        api.post('/meals/cart/:mealId', jsonBodyParser, addMealToCartHandler)

        //remove meal from cart
        api.delete('/meals/cart/delete/:mealId', jsonBodyParser, removeMealFromCartHandler)

        //retrieve meals in cart
        api.get('/meals/cart/', retrieveCartMealsHandler)

        //pay meals in cart
        api.post('/meals/pay', payMealsInCartHandler)


        //mark meal as ready
        api.post('/meals/ready', jsonBodyParser, markAsReadyHandler)

        //mark meal as complete
        api.post('/meals/complete', jsonBodyParser, markAsCompletedHandler)

        //increment meal in cart
        api.post('/meals/cart/increment/:mealId', jsonBodyParser, incrementMealsInCartHandler)

        //retrieve meals pending to pick up
        api.get('/meals/cart/pending', retrievePendingToPickUpHandler)

        //retrieve meals pending to deliver
        api.get('/meals/pending/deliver', retrievePendingToDeliverHandler)

        //retrieve meals waiting client to pick up
        api.get('/meals/waiting/pickUp', retrieveWaitingClientToPickUpHandler)

        //search meals and retrieve results
        api.post('/meals/search', jsonBodyParser, searchMealsHandler)

        //Toggle like chef
        api.patch('/users/like/:chefId', toggleLikeChefHandler)

        //Retrieve likes chefs
        api.get('/users/like', retrieveLikedChefsHandler)

        api.get('/IKAuth', (req, res) => {
            const result = imagekit.getAuthenticationParameters()
            res.send(result)
        })

        api.listen(1234, () => console.log('server up'))
    })
    .catch(error => {
        console.log(error)
    })
