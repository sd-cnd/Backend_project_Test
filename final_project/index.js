const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({ 
    secret: "fingerprint_customer", 
    resave: true, 
    saveUninitialized: true,
    cookie: { 
        secure: false, 
        maxAge: 18000000 
    }  
}))

app.use("/customer/auth/*", function auth(req, res, next) {
    // Extract the token from the session or authorization header
    const token = req.session.token || req.headers['authorization'];

    if (!token) {
        return res.status(403).send({
            message: "no token provided"
        });
    }

    jwt.verify(token, 'fingerprint_customer', (err, decoded) => {
        if (err) {
            return res.status(500).send({ 
                message: 'Failed to authenticate token.' 
            });
        }
        req.user = { username: decoded.username };;
        next();
    });
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
