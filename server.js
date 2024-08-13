const express = require("express");
const cors = require("cors");
const db = require("./models");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/notes", noteRoutes);

db.sequelize
    .sync()
    .then(() => {
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });
