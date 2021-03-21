var path           = require('path');
var express        = require('express');
var app            = express();
var methodOverride = require('method-override');

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

app.post("/signup", (req,res) => {
    
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));