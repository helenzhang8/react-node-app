const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://areaprobe:parking@cluster0.jzp7s.mongodb.net/parking?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
let list = []
client.connect(err => {
    const collection = client.db("parking").collection("bedstuy");
    collection.find().forEach(async (item)=>{
        list.push(item);
    }).then(()=>{client.close();})
    // perform actions on the collection object
    // client.close();
});

app.get("/api", (req, res) => {
    res.json({ message: list });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
