const express = require('express');
const port = process.env.PORT || 9000;
const CustomerRoutes = require('./routes/customerRoutes');
const app = express();

// app.engine('hbs', exphbs( {extname: '.hbs'}));
app.set('view engine', 'hbs');

// app.use(express.urlencoded({ extended: true }))
// app.use(express.json());

app.use(express.urlencoded({ extended: true }))
app.use(express.json());


app.use('/auth', require('./routes/auth'));
app.use('/', CustomerRoutes);



//running the server
app.listen(port, function (res, req) {
    console.log(`Server Run at ${port}`);
});