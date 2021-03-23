var path           = require('path');
var express        = require('express');
var app            = express();
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var bcrypt         = require("bcrypt");
var session        = require("express-session");
var passport       = require("passport");
var LocalStrategy  = require("passport-local");
var flash          = require("connect-flash");
//database
var User           = require('./models/user');

//routes
var userRoutes = require("./routes/users");

//connect mongoose to mongodb
mongoose.connect("mongodb://localhost:27017/code-play", { useNewUrlParser: true ,useUnifiedTopology: true})
.then(() => {
    console.log("CONNECTION OPEN !!");
})
.catch(err => {
    console.log("There is some error!!");
    console.log(err);
})
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function() {
//   // we're connected!
// });

app.use(methodOverride('_method'));
app.use(flash());
//for parsing 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));
//start a session
const sessionConfig = {
    secret: 'thishsouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000*60*60*24*7,
        maxAge: 1000*60*60*24*7
    }
}

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());//store in a session
passport.deserializeUser(User.deserializeUser());//remove from a session

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
		res.locals.success = req.flash("success");
	next();
});

app.use(userRoutes);

app.get("/",function(req,res){
    // res.sendFile('landing.html', {root : __dirname + '/views'});
    res.render("landing");
});

// app.get("/login", (req,res) =>{
//    res.render("login");
// });

// app.get("/signup", (req,res) => {
//     res.render("signup");
// });

// app.post("/login", async(req,res) => {
//     const {password, username} = req.body;
//     const user = await User.findOne({$or:[{"username" :username},{"email" : username}]});

//     const validPassword = await bcrypt.compare(password,user.password);
//     if(validPassword)
//     {
//         req.session.user_id = user._id;
//         res.send("You have successfully logged in");
//     } 
//     else
//     {
//         res.redirect('/login');
//     }
// });

// app.post("/signup", async (req,res) => {
//     const {password, username, email, name} = req.body;
//     const hash = await bcrypt.hash(password,12);
//     // res.send({hash,username,email,name});
//     const user = new User ({
//         username,
//         name,
//         password : hash,
//         email
//     })
//     await user.save();
//     req.session.user_id = user._id;
//     res.redirect("/login");
// });

// app.get("/secret", (req,res) => {
//   res.send("HELLO");
// });

app.post("/logout", (req,res) => {
   req.session.user_id = NULL;
   req.session.destroy();
   res.redirect("/login");
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));