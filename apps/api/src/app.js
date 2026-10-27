const express = require('express');
const pool = require('./db/pool');

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

app.get('/health/ready', async (_req, res) => {
    try{
        await pool.query('SELECT 1');

        res.status(200).json({
            status: 'ready',
            database: 'connected',
        });
    }catch(error){
        console.error('Database readiness check failed:', error.message);

        res.status(503).json({
            status: 'not_ready',
            database: 'disconnected',
        });
    }
});

module.exports = app;