const express = require("express");

const app = express();

app.get('/login',(req,res)=>{
    res.send("Hello from server!");
})

app.listen(3000,()=>{
    console.log("Server Running at 3000!");
})