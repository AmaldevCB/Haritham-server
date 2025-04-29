const express = require('express')

const userController = require('./controllers/userController')
const adminController = require('./controllers/adminController')
const paymentController = require('./controllers/paymentController')
const jwtMiddleware = require('./middleweare/jwtMiddlewere')

const router = new express.Router()

// register
router.post('/register', userController.register)

// login
router.post('/login', userController.login)

// admin login
router.post('/admin-login', adminController.adminLoginController)

// get all users
router.get('/get-all-users',jwtMiddleware,adminController.getUserController)

// get all requests
router.get('/get-all-requests',jwtMiddleware,adminController.getrequestController)

// get all complaints
router.get('/get-all-complaints',jwtMiddleware,adminController.getcomplaintController)

// approve request
router.put('/approve-request',jwtMiddleware,adminController.approveRequestController)


// new request
router.post('/new-request',jwtMiddleware,userController.newRequest)

// status
router.post('/status',jwtMiddleware,userController.status)

// complaint
router.post('/complaint',jwtMiddleware,userController.complaint)

// edit profile
router.put('/edit-profile',jwtMiddleware,userController.editProfile)

// payment
router.post('/create-order',paymentController.createOrder)
router.post('/verify-payment',paymentController.verifyPayment)

// delete complaint
router.delete('/delete-complaint',jwtMiddleware,adminController.deleteController)


module.exports = router
