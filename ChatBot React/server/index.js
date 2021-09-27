const express = require('express');
const chatController = require('./controllers/chat');

const app = express();

app.use(express.json());

app.get('/chats', chatController.load);

app.listen(9090, () => {
    console.log('Listening port 9090')
});