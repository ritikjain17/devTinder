const express = require("express");
const {adminAuth , userAuth} = require("./middleware/auth")


const app = express();


app.use("/" , (err, req, res, next) => {
    console.log("Reached!")
    res.send("Something Went Wrong")
})

app.get('/user' , (req, res) => {

    // try{
        throw new Error("tdyhuijmkolpkjihugyft");
        res.send("respone data send");
    // }catch{
    //     res.status(501).send("Internal Server Error!");
    // }
})

app.use("/" , (err, req, res, next) => {
    console.log("Reached!")
    res.send("Something Went Wrong")
})



// app.use("/admin" , adminAuth)

// app.get("/admin/getAllData",  (req, res) => {
//     res.send("All data is provided succesfully!");
// })

// app.delete("/admin/deleteData" , (req, res) => {
//     res.send("data deleted successfully");
// })


// app.get("/user/getAllData" , userAuth,  (req, res) => {
//     res.send("All data is provided succesfully!");
// })

// GET /user => middleware => response middleware;
// app.use("/" , (req, res , next) => {
//     console.log("route 1");
//     next()
// })


// app.get('/user' , (req, res, next) => {
//     console.log("This will act as middleware 1");
//     next();
// }, 
// (req, res, next) => {
//     res.send("This will be response handler !")
// })

app.listen(7777, () => {
    console.log("server is listening from the port : 7777");
})


console.log("Making a Dev Tinder of backend here!")