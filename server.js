const express = require("express");
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT||3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine',hbs)
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentHelper',()=>{
    return  new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});


app.use((req,res,next)=>{
    var date = new Date().toString();
    var log = `${date}:${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n');
    next();
});
/*
app.use((req,res, next)=>{
    res.render('maintenance.hbs');
});
*/

app.get('/',(req,res)=>{
    res.render('Home.hbs',{
        pageTitle:'Home page',
        pageMessage:'Welcome to my home page'  
    });
})

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle:'About Me'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
       errorMessage : 'unable to handle request'
    });
});

console.log('Trying to start server');

app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});