import express from "express";
import cors from "cors";
import chalkAnimation from "chalk-animation";
import database from "./database.js";
const app = express();
const port = 5001;


var connection;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Go to Customers Page')
})
import routes from "./routes/router.js";
app.use('/customers', routes )


database.connect(()=> {
    app.listen(port , () => {
        chalkAnimation.radar(`Running on port ${port}`);
        connection = database.connection()
    })
})