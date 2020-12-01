const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const { request } = require('http');
const { response } = require('express');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (request, response)=>{
    response.sendFile(__dirname + '/index.html');
    //response.send("<h1>Hello World!</h1>")
});

app.post('/', (request, response)=>{
    let userChoice = request.body.currency;
    console.log(userChoice);

    axios.get("https://api.coindesk.com/v1/bpi/currentprice/eur.json")
    .then(res => {

        let eur = res.data.bpi.EUR.rate;
        let usd = res.data.bpi.USD.rate;
        console.log('EUR', eur);
        console.log('USD', usd);
        let message = '';

        if(userChoice === 'EUR'){
            messsage = 'EUR'+ eur;
            response.send('EUR'+ eur);
        } else {
            message = 'USD'+ usd;
            response.send(message);
        }
        
    })

});


app.get('/about', (request, response) => {
    response.send("Martin says Hi!");
});

app.get('/contact', (request, response) => {
    response.send("contact: 53277446");
});

app.listen(2000, ()=>{
    console.log('Server is running on Port 2000')
});