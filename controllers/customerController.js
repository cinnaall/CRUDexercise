const mySql2 = require('mysql2');
const Router = require('../routes/customerRoutes');

//Create Datebase Connection
const db = mySql2.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Kaibabs.1994",
    database: "exercise",
});

//Checking Database connection
db.connect((err) => {
    if (err) console.log(`Error: ${err}`);

    else console.log(`Database connection success!`);
});

exports.login = async (req, res) => {
    try {

        const {email, password} = req.body;

        if (!email || !password ) {
            return res.status(400).render('index', {message: 'Provide email and password'});
        } 
        else db.query(`SELECT * from register WHERE email = ?`, [email], async (err, result) => {

            if (email != email || password != password) {
                return response.status(401).render('login', { message: `Invalid email or password!` });
            }
            else {
                db.query(
                    `SELECT * from customer`, (err, result) =>{
                        res.render('list', {user: result, title: 'List of Customers'})
                    }
                )
            }
        })
    }
    catch (err) {
        console.log(err)
    }
}


exports.addcustomer = (req, res) => {

    const { first_name, last_name, address, email, contact } = req.body;

    db.query('SELECT email FROM customer WHERE email = ?', email, (err, result) => {
        if (err) console.log(err)

        if (result.length > 0) {
            return res.render('addcustomer', { message: 'Email entered is already in used!' })
        }

        db.query(
            `INSERT INTO customer SET ?`, {
            first_name: first_name, 
            last_name: last_name, 
            address: address,
            email: email, 
            contact: contact
        }, (err, result) => {
            if (err) console.log(err);

            else return res.render('addcustomer', { message: 'Customer successfully added.' });
        }
        )
    });
}

exports.update_form = (req, res) => {
    const email = req.params.email; //passing a parameter
    
    db.query(`SELECT * FROM customer where email = ?`, email, (err, result) => {
        res.render('updateform', {title: 'Edit user', user: result[0]})
    })
}

exports.update_user = (req, res) => {
    const { first_name, last_name, address, email, contact } = req.body;

    db.query(
        `UPDATE customer SET ? WHERE email = ?`, [{
        first_name,
        last_name,
        address,
        contact,
    },email], (err) => {
        if (err) return console.log(`Occured ${err}`);

        // res.render('updateform', { message: 'User has been updated!' });
        
        db.query('SELECT * FROM customer ', (err, result) => {
                res.render('list', { user: result, title: 'List of Customers' })
            })
        
    });
}


exports.delete = (req, res) => {
    const email = req.params.email

    db.query(`DELETE FROM customer where email = ?`, email, (err, result) => {
        if (err) console.log(err);
        
        else {
            db.query('SELECT * FROM customer ', (err, result) => {
                res.render('list', { user: result, title: 'List of Users' })
            })
        }
    })
}