const express = require('express');
const router = express.Router();

//GET Seller by Id
router.get('/:id', async (req, res) => {
  req.body.id = req.params.id;
  req.body.path = 'getSellerByIdHandler'
  kafka.make_request('profile', req.body, (err, results) => {
  
    console.log(results)
    res.status(results.status).send(JSON.parse(results.data));

  });
  
});

//Get All Sellers
router.get('/', async (req, res) => {
  req.body.path = 'getAllSellerHandler';
  kafka.make_request('profile', req.body, (err, results) => {
  
    console.log(results)
    res.status(results.status).send(JSON.parse(results.data));

  });
    
});

module.exports = router;
