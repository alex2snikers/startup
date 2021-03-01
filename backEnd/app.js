const express = require('express');
const app = express();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { port, uri, TOKEN_SECRET } = require('./constants');

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
    return jwt.sign({ userId }, TOKEN_SECRET);
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

// -------

// app.use('/api/users', require('./api/users'));
app.use('/api/tasks', require('./routes/api/tasks'));
// app.use('/api/sprints', require('./api/sprints'));
app.use('/api/columns', require('./routes/api/columns'));
app.use('/api/projects', require('./routes/api/projects'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});