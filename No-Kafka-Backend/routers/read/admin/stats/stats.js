const express=require('express');
const router = express.Router();
const Sale = require('../../../../mongoModels/sales');
const Purchase = require('../../../../mongoModels/customerPurchase');
const Order = require('../../../../mongoModels/orders');
const Product = require('../../../../mysqlModels/Product');


router.get('/top/seller/', async (req, res) => {
    try {
        const sellers = await Sale.find({}).sort({sales: -1}).limit(5);
        return res.status(200).send(sellers);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/top/customer/', async (req, res) => {
    try {
        const customers = await Purchase.find({}).sort({purchase: -1}).limit(5);
        return res.status(200).send(customers);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/orderPerDay/', async (req, res) => {
    let day = new Date().toISOString().slice(0,10);
    console.log(day);
    try {
        const orders = await Order.find({orderDate: {$gte: day}}).limit(10);
        return res.status(200).send({length: orders.length});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/top/products/', async (req, res) => {
    let topProducts = {}
    //+ topProducts[product.productId] === undefined ? 0:topProducts[product.productId][total]
    try {
        const orders = await Order.find({})
        orders.map((order) => {
            order.products.map((product) => {
                topProducts[product.productName] = product.totalPrice + (topProducts[product.productName] === undefined ? 0 : topProducts[product.productName]) 
            })
        })

        var products = Object.keys(topProducts).map((key) => {
            return [key, topProducts[key]];
        });
          
        products.sort((first, second) => {
            return second[1] - first[1];
        });
        console.log(topProducts);
        return res.status(200).send(products.slice(0, 5));
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/seller/sales/:sellerName', async (req, res) => {
    const sellerName = req.params.sellerName;
    let day = new Date().toISOString().slice(0, 8) + "01";
    var total = 0;
    console.log(day);
    try {
        const orders = await Order.find({orderDate: {$gte: day}})
        orders.map((order) => {
            order.products.map((product) => {
                if(product.sellerName === sellerName) {
                    total += product.totalPrice;
                }
            })
        })
        console.log(total);
        return res.status(200).send({total});
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

router.get('/products/rating/', async (req, res) => {
    try {
        const products = await Product.findAll({
            order: [['rating', 'DESC']]
        })
        console.log(products);
        return res.status(200).send(products);
    } catch(err) {
        console.log(err);
        return res.status(500).send('Internal Server Error!');
    }
})

module.exports=router;