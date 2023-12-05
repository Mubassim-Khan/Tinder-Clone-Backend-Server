import mongoose from "mongoose";
import express from "express";
import Cards from "./dbCards.js"
import Cors from "cors"
import serverless from "serverless-http"

const router = express.Router();

// App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url = "mongodb+srv://mubassimkhan:uuT7LxfZtpPZIow1@tinder-clone.3ucizef.mongodb.net/tinderdb?retryWrites=true&w=majority";

// Middlewares
app.use(express.json());
app.use(Cors());
 
// DB config
mongoose.connect(connection_url, {
    // useNewUrlParser: true,   -> No Longer Needed
    // useUnifiedTopology: true -> No longer Needed
}).then(() => {
    console.log("Connection is successfull :)");
}).catch((e) => {
    console.log("No Connection :( => " + e);
});

// API Endpoints
app.get("/", (req, res) => res.status(200).send("Hello Me Here"))

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard)
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
            console.log("Error in create method" + err);
        });
});

app.get('/tinder/cards', (req, res) => {
    Cards.find()
        .then(result => {
            res.status(200).send(result);
        })
        .catch(err => {
            res.status(500).send(err);
            console.log("Error in find method" + err);
        });
});


// Listener
app.listen(port, () => console.log(`Listening on localhost port no: ${port}`))

app.use('/.netlify/functions/server', router);
// export default serverless(app).handler;
export default app;
export const handler = serverless(app);

