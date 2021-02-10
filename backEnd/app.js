const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 9010;
const uri = "mongodb+srv://alex2snikers:222282351995@cluster0.iruem.mongodb.net/startup?retryWrites=true&w=majority";

const User = require('./models/User');

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, () => {
    console.log('CONNECTES MONGO');
}, (err => { console.log('Mongo:', err) }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

app.post('/login', async (req, res) => {
    User.find({ ...req.body })
        .exec()
        .then(() => {
            res.status(200)
        })
        .catch(err => {
            res.status(500).json({ error: err});
        });

});

app.post('/registrate', async (req, res) => {
    await User.find({ ...req.body })
        .exec()
        .then(data => {
            if (data) {
                res.status(400).json({ messages: 'email is already exist. Please Login'});
            } else {
                const newUser = new User({
                    _id: new mongoose.Types.ObjectId(),
                    ...req.body
                })

                newUser.save()
                    .then(() => res.status(200))
                    .catch(() => res.status(400).json(err));
            }
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});