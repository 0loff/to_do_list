const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const db = require("./app/models");
const bp = require("body-parser");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

require("./app/routes/task.routes")(app);

setTimeout(
    () => {
        db.sequelize.sync()
            .then(() => {
                console.log("Database was synced.")
            })
            .catch((err) => {
                console.log("Failed to sync database" + err.message)
            })
    },
    300);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my to-do tracker" })
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, function () {
    console.log(`Server is running on port - ${PORT}`)
});

