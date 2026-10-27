const path = require('node:path');

require('dotenv').config({
  path: path.resolve(__dirname, '../../../.env'),
});

if(!process.env.DATABASE_URL){
    throw new Error('DATABASE_URL environment variable is required');
}

const app = require('./app');
const pool = require('./db/pool');

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
    console.log(`Helpdesk API listening on port ${port}`);
});

function shutdown(signal){
    console.log(`${signal} received; shutting down...`);

    server.close(async () => {
        try{
            await pool.end();
            process.exitCode = 0;
        }catch(error){
            console.error('Error closing database pool:', error);
            process.exitCode = 1;
        }
    });
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));