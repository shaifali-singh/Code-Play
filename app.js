var path    = require('path');
var express = require('express');
var app     = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get("/",function(req,res){
    res.sendFile('landing.html', {root : __dirname + '/views'});
})


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`App running on port ${PORT}`));