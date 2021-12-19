const express = require('express');
const router = express.Router();
const regController =require('../controllers/customerController');

router.post('/login', regController.login);
router.post('/addcustomer', regController.addcustomer);
router.get('/updateform/:email', regController.update_form);
router.post('/update_user', regController.update_user);
router.get('/delete/:email', regController.delete);

module.exports = router;