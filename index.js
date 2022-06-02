const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();              //Instantiate an express app, the main work horse of this server
const port = 5000;                  //Save the port number where your server will be listening

//setting middleware
app.use('/dist', express.static('dist'));

app.use(cors({
    allowedOrigins: [
        'http://localhost:5000'
    ]
}));

// //Idiomatic expression in express to route and respond to a client request
// app.get('/', (req, res) => {        //get requests to the root ("/") will route here
//     res.sendFile('src/index.html', { root: __dirname });      //server responds by sending the index.html file to the client's browser
//     //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile
// });


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`);
});


app.post('/', function (req, res) {
    const body = req.body.Body
    console.log(body)
    // res.set('Content-Type', 'text/plain')
    // res.send(`You sent: ${body} to Express`)
    res.send("HI");

})