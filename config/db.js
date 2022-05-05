/*const { MongoClient } = require("mongodb");

// Replace the following with your Atlas connection string
const url = `mongodb+srv://${process.env.DB_USER_PASS}@cluster0.k5wpj.mongodb.net/test?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const client = new MongoClient(url);

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

run().catch(console.dir);*/

const mongoose = require("mongoose");

mongoose
    .connect(
        `mongodb+srv://${process.env.DB_USER_PASS}@cluster0.k5wpj.mongodb.net/social_blue`, {
            retryWrites: true,
            w: "majority"
        }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));