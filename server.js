const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {       // Express middle-ware
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('Server.log', log + '\n', (err) => {
        if(err){
            console.log("Unable to append to server.log");
        }
    });
    next();
});

// app.use((req, res, next) => {        // Maintenance Purpose
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {    // registerHelper w/o argument
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {      // registerHelper with argument
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        currentYear: new Date().getFullYear(),
        welcomeMessage: "Welcome to this site"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});







/* 
1. app.get() = To set default routes

2. app.use() = To set custom routes

3. __dirname = Saves actual path of project

4. res.render('about.hbs') = In response it sends the requested rendered page "HBS": Handle Bars

5. {{> footer}} : Syntax t inject a footer in file

6. hbs.registerPartials(__dirname + '/views/partials') : Partials are used to reuse code or content of the page like header, footer

7. nodemon server.js -e js,hbs : -e is to watch the extentions like js,hbs in nodemon

8. registerPartials : Partial code or template to be used multiple times

9. registerHelper : Method or a function to be used multiple times

10. Middle-ware : means app does stop there waiting for next() method, if it is not provided it stops the execution of current middle-ware

11. fs.appendFile('Server.log', log) : server.log is file name, log is the data to be entered in the file


*/