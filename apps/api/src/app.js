const express = require('express');

const app = express();

//Avoid exposing the express framework header
app.disable('x-powered-by');

// Parse incoming json request bodies
app.use(express.json({limit: '1mb'}));

//Health-check endpoint.
app.get('/health', (_req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'helpdesk-api',
        timestamp: new Date().toISOString(),
    });
});

module.exports = app;