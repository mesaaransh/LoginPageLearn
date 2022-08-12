const express = require('express')
const ejs = require("ejs")
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const encrypt = require("mongoose-encryption")

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set('view engine', 'ejs')

mongoose.connect('mongodb://localhost:27017/userBase')

const userSchema = new mongoose.Schema({
    _id: String,
    password: String
})

const secret = "ThisisOurSecret"
userSchema.plugin(encrypt, {secret: secret, encryptedFeilds: 'password'})

const userData = mongoose.model('User', userSchema)










app.get("/", function(req, res){
    res.render('home')
})

















app.get("/login", function(req, res){
    res.render('login')
})

app.post("/login", function(req, res){
    var username = req.body.username
    var password = req.body.password

    userData.find({username: username}, (err, data) => {
        if (data[0].password == password) {
           res.render('secrets.ejs')         
        }
        else{
            res.send('no user found')
        }
    });
})



















app.get("/register", function(req, res){
    res.render('register')
})

app.post("/register", (req, res) => {
    var username = req.body.username
    var password = req.body.password

    const newUser = new userData({
        _id: username,
        password: password
    })

    newUser.save()
    res.redirect("/")
})















app.listen(8000, ()=>{console.log("----------AppStarted-----------");})