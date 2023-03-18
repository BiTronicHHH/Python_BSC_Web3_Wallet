const express = require("express");

const app = express();

const bodyParser = require("body-parser");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json({ extended: true }));
// cors
app.use(require("cors")());

app.get('/', (req, res) => {
    return res.json({
        'Hello': 'welcome1111'
    });
})

// Routes global config
app.use("/api", require("./routes/index.routes"));

module.exports = app;