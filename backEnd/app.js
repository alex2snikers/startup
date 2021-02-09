const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
// var uri = "mongodb://alex2snikers:222282351995@cluster0.iruem.mongodb.net/startup?ssl=true&replicaSet=atlas-133g5o-shard-0&authSource=admin&retryWrites=true&w=majority";
const uri = "mongodb+srv://alex2snikers:222282351995@cluster0.iruem.mongodb.net/startup?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("startup").collection("users");
//   // perform actions on the collection object
//   console.warn('test', collection);
  
//   client.close();
// });

// const featuredSchema = new mongoose.Schema({}, { collection: "users" });
// const Featured = mongoose.model('featured', featuredSchema);

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('CONNECTES MONGO');
}, (err => {
    console.log('Mongo:', err);
}));

const UserSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
});

const User = mongoose.model('User', UserSchema);

const port = 9010;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.get('/login', async (req, res) => {

//   const newUser = new User({
//       _id: new mongoose.Types.ObjectId(),
//       name: 'Test',
//       email: 'test',
//       password: 'test',
//   })
//   newUser.save()
//     .then((result) => console.log(result))
//     .catch((result) => console.log('res', result));

//   res.setHeader('Content-Type', 'application/json');
//   res.status(201).json({
//       message: 'test login',
//       newUser,
//   });


    User.findById('6022fa5f5d86a711d9720926')
        .exec()
        .then(doc => {
            res.status(201).json(doc);
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});