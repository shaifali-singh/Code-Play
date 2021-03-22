var path           = require('path');
var express        = require('express');
var app            = express();
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var bcrypt        = require("bcrypt");
//database
var User           = require('./models/user');
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
//for parsing 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    // res.sendFile('landing.html', {root : __dirname + '/views'});
    res.render("landing");
});

app.get("/login", (req,res) =>{
   res.render("login");
});

app.get("/signup", (req,res) => {
    res.render("signup");
});

app.post("/login", (req,res) => {

});

app.post("/signup", async (req,res) => {
    const {password, username, email, name} = req.body;
    const hash = await bcrypt.hash(password,12);
    // res.send({hash,username,email,name});
    const user = new User ({
        username,
        name,
        password : hash,
        email
    })
    await user.save();
    res.redirect("/login");
});

app.get("/secret", (req,res) => {
  res.send("HELLO");
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));