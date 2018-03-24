var caradisiac = require('./caradisiac');
const express = require('express');

const app = express();
const port = process.env.PORT || 9292;

//API route
app.get('/populate', (req, res) => {
    res.write("Populating");
    caradisiac.PutCarsOnElastic(function(){
        res.write("Populated");
    });
});

app.get('/cars', (req, res) => {
    res.setHeader('Content-Type', 'json');
    caradisiac.GetCarsFromElastic(function(cars){
        res.write(JSON.stringify(cars));
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
