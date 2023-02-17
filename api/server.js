// BUILD YOUR SERVER HERE

const express = require('express'); 
const User = require('./users/model');

const server = express();
server.use(express.json());

server.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch(err) {
        res.status(500).json('Horrible error!')
    }
});

server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json('Horrible error!')
    }
});

server.post('/api/users', async (req, res) => {
    try {
        const user = await User.insert(req.body.name, req.body.bio)
        res.status(201).json(user)
    } catch(err) {
        res.status(500).json({ message: 'horrible stuff happened' })
    }
})


module.exports = server; // EXPORT YOUR SERVER instead of {}
