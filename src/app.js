const express = require("express");

const app = express();



// this is the regex where B is option and there so many regex type thing in express 4 version
app.get("/ab?c" , (req, res) => {
    res.send('E is optional')
})

app.get('/user/:userId/:userName/:userMobile' , (request,res) => {
    console.log(request.params);
    res.send('getting the data of the user')
})

app.get("/user" , (req,res) => {
    console.log(req.query)
    res.send("getting query items")
})


// this will only handle the get call of /hello
app.get('/hello' , (req, res) => {
    res.send("Get call from the 7777")
})

app.post('/hello' , (req, res)=> {
    res.send({Name:"Ritik" , Mobile:"67875678876"})
})

app.delete('hello' , (req, res) => {
    res.send("User Deleted Successfully");
})


// this will match all the http methods api calls to /hello
app.use('/hello/123' , (req, res)=> {
    res.send("Hello from the server hello 1234")
})

app.use('/hello' , (req, res)=> {
    res.send("Hello from the server --")
})

app.use('/test' , (req, res)=> {
    res.send("Response from the server --")
}) 

app.listen(7777, () => {
    console.log("server is listening from the port : 7777");
})

// app.use('/' , (req, res)=> {
//     res.send("Namaste Guys  --")
// })

console.log("Making a Dev Tinder of backend here!")