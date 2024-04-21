// index.js

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();



app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DBUser}:${process.env.DBPass}@cluster0.f7nunbs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const database = client.db("usersDB");
    const usersCollection = database.collection("users");


    // get all user
    app.get('/users', async (req, res) => {
        try {
            const cursor = usersCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        } catch (error) {
            console.error('Error fetching users:', error);
            res.status(500).json({ success: false, message: "Failed to fetch users" });
        }
    });
    
    // get single user
    app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = {_id: new ObjectId(id)}
        const user = await usersCollection.findOne(query);
        res.send(user);
    });


    // create new user
    app.post(('/users'), async(req, res)=> {
        try {
          const user = req.body;
          console.log(user);
          const result = await usersCollection.insertOne(user);
          res.json({ success: true, message: "User added successfully" }); // Sending success response
        } catch (error) {
          console.error('Error adding user:', error);
          res.status(500).json({ success: false, message: "Failed to add user" }); // Sending error response
        }
      });
      


      // update user
      app.put('/users/:id', async(req, res)=> {
        const id = req.params.id;
        const users = req.body;

        console.log(id, users );

        const filter = {_id: new ObjectId(id)}
        const options = {upsert: true}
        const updateUser = {
          $set: {
            name: users.name,
            email: users.email
          }
        }

        const result = await usersCollection.updateOne(filter, updateUser, options);

        res.send(result);

      })


    // delete user
    app.delete('/users/:id', async(req, res)=> {
        const id = req.params.id;
        
        const query = {_id : new ObjectId(id)};
        const result = await usersCollection.deleteOne(query);
        res.send(result);
    })


    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("simple crud is running !");
});

app.listen(port, (req, res) => {
  console.log(`simple app is running, ${port}`);
});
