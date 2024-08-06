const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

//cookie
app.use(cookieParser());

//setting cookie
app.get('/', (req, res) => {
    res.cookie("name", "sheri");
    res.send('hy!');
})
//getting cookie
app.get('/readcookie', (req, res) => {
    res.send(`${req.cookies}`)
    console.log(req.cookies)
})


//encrypting and comparing password

app.get('/encryptpswrd', (req, res) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash("myPassword", salt, (err, hash) => {
            console.log(hash);
        })
    })
    res.send('password hashing')
})
//for determining wether password matches or not
app.get('/comparepswrd', (req, res) => {
    bcrypt.compare("myPassword", "$2b$10$Oyem7aI9QTz92IUlf546OeiAx25dP3Esj0A4Om1wzw66csDep9qG2", (err, result) => {
        console.log(result);
        res.send(result);
    })
})






//jsonwebtoken aka jwt
//encryption of data
app.get('/encjwt', (req, res) => {
    const token = jwt.sign({email: "sheri@backend.com"}, "secret");
    console.log(token);
    res.cookie("token", token);
    res.send(token);
})
// decryption of data
app.get('/decjwt', (req, res) => {
    const token = req.cookies.token;
    const data = jwt.verify(token, 'secret');
    console.log(token, data);
    res.send(data);
})

app.listen(3000, () => {
    console.log('app is listening at port 3000');
})