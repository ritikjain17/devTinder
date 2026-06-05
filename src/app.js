const express = require("express");

const app = express();

// app.use('/' , (req, res)=> {
//     res.send("Namaste Guys  --")
// })
app.use('/hello' , (req, res)=> {
    res.send("Hello from the server --")
})


app.use('/test' , (req, res)=> {
    res.send("Response from the server --")
}) 

app.listen(7777, () => {
    console.log("server is listening from the port : 7777");
})


console.log("Making a Dev Tinder of backend here!")