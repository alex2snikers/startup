const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const port = 9010;
const uri = 'mongodb+srv://alex2snikers:222282351995@cluster0.iruem.mongodb.net/startup?retryWrites=true&w=majority';
const TOKEN_SECRET = '7bc78545b1a3923cc1e1e19523fd5c3f20b409509';

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

function generateAccessToken(userId) {
    return jwt.sign({ userId }, TOKEN_SECRET, { expiresIn: '24h' });
}

app.post('/login', async (req, res) => {
    User.find({ ...req.body })
        .exec()
        .then((data) => {
            if (data) {
                const token = generateAccessToken(data[0]._id);
                
                res.status(200).json({ token });
            } else {
                res.status(400).json({ message: 'email or login is wrong' });
            }
            
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