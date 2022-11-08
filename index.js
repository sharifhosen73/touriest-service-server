const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASSWORD_DB}@cluster0.v5n2r.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const placeCollection = client.db("tourist-services").collection("places");
    app.get("/place", async (req, res) => {
      const query = {};
      const cursor = placeCollection.find(query);
      const places = await cursor.toArray();
      res.send(places);
    });

    app.get("/place/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const place = await placeCollection.findOne(query);
      res.send(place);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("tourist services server");
});

app.listen(port, () => {
  console.log("tourist services server", port);
});
