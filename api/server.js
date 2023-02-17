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
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
});

server.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }
});

server.post('/api/users', async (req, res) => {
    try {
        const { name, bio } = req.body
        const user = await User.insert({ name, bio })
        res.status(201).json({
            data: user,
            message: "success creating user!"
        })
    } catch(err) {
        res.status(500).json({ message: 'horrible stuff happened' })
    }
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.update(req.params.id, req.body)
        res.status(200).json({
            data: user
        })
    } catch(err) {
        res.status(500).json({ message: "The user information could not be modified" })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.remove(req.params.id)
        res.status(200).json({
            data: user
        })
    } catch(err) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})



module.exports = server; // EXPORT YOUR SERVER instead of {}
