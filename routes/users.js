var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passport = require('passport');

router.get("/signup", (req,res) => {
  res.render("signup");
});

router.post("/signup", async(req,res) => {
    try{
  const {name,email,username,password} = req.body;
  const user = new User({email,username,name});
  const registeredUser = await User.register(user,password);
  console.log(registeredUser);
  req.flash("success","welcome to coding playground");
  res.redirect("/login"); 

    } catch (e) {
        req.flash("error",e.message);
        res.redirect("/signup");
    }
});

router.get("/login", (req,res) => {
   res.render("login");
});

router.post("/login", passport.authenticate("local", {failureFlash: true, failureRedirect: '/login'}), (req,res) => {
   req.flash("success", "Welcome Back!!");
   res.redirect("/");
});

router.get("/logout", (req,res) => {
    req.logout();
    req.flash("succes","Logged you out!");
    res.redirect("/");
})


module.exports = router;