require("dotenv").config()

const express = require("express");
const app = express();

require("./models/database");


//body parser
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(require("cors")({credentials : true , origin : true}));

app.use(require("./routers/indexRouters"));


app.listen(process.env.PORT,function(){
    console.log("sever is running on port 3000");
})