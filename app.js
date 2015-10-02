var express = require('express');
var app = express();

// wrappers
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.get('/admin', function (req, res) {
    res.sendFile(__dirname + '/admin.html');
});

// noms et valeurs de départ

var drinks = [
    {name: 'wine', count: 0, percent:0, price:7},
    {name: 'beer', count: 0, percent:0, price:5},
    {name: 'cocktail', count: 0, percent:0, price:8},
    {name: 'champagne', count: 0, percent:0, price:9}
];




io.on('connection', function (socket) {
    socket.on('commande', function (beverage) {

        var total = 0;

        for (var i = 0; i < drinks.length; i++) {
            var tab = drinks[i];
            if (tab.name === beverage) {
                tab.count++;


            }
            total += tab.count;
        }

        console.log(drinks);

        for(var j=0 ; j < drinks.length; j++){
            drinks[j].percent = Math.round(drinks[j].count / total * 100);
        }

        io.sockets.emit('drinks', drinks);
    });
});

http.listen(3000, function () {
    console.log('running server on port 3000');
});




