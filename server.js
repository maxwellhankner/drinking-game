const express = require("express");
const db = require('./models');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const apiRoutes = require("./controllers/promptController.js");
const htmlRoutes = require("./controllers/htmlController.js");
app.use(apiRoutes);
app.use(htmlRoutes);

let server;

db.sequelize.sync().then(function(){
    server = app.listen(PORT, function() {
        require("./socketio/index.js")(server);
        console.log("App now listening at localhost:" + PORT);
        
    });
});