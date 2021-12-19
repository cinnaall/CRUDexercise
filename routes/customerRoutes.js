const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.render('index')
})

Router.get('/addcustomer', (req, res) => {
    res.render('addcustomer');
})

Router.get('/list', (req, res) => {
    res.render('list')
})

module.exports = Router;