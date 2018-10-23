const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('hello word'));

const VERIFY_TOKEN = 'xxxx';

app.get('/webhook', (req, res) => {


    let mode      = req.query['hub.mode'];
    let token     = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (!(mode && token)) {
        return;
    }

    if (!(mode === 'subscribe' && token === VERIFY_TOKEN)) {
        return res.sendStatus(403);
    }

    console.log('WEBHOOK_VERIFIED');
    res.status(200).send(challenge);
});

app.post('/webhook', (req, res) => {

    let body = req.body;

    if (body.object !== 'page') {
        return res.sendStatus(404);
    }

    body.entry.forEach(function (entry) {

        let webhook_event = entry.messaging[0];
        console.log(webhook_event);

    });

    return res.status(200).send('EVENT_RECEIVED');

});

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`app running in port ${port}`));
