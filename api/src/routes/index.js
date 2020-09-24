const { Router } = require('express');
// import all routers;
const productRouter = require('./product.js');
const categoryRouter = require('./category');
const userRouter = require('./user');
const orderRouter = require('./orden');
const authRouter = require('./auth');
const reviewRouter = require('./reviews')
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/category', categoryRouter);
router.use('/user', userRouter);
router.use('/orders', orderRouter);
router.use('/reviews', reviewRouter)
router.use('/auth', authRouter);
module.exports = router;
