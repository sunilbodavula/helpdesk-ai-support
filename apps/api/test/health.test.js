const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

test('GET /health returns a successful health response', async () => {
    const response = await request(app).get('/health');

    assert.equal(response.status, 200);

    assert.match(
        response.headers['content-type'],
        /application\/json/
    );

    assert.equal(response.body.status, 'ok');
    assert.equal(response.body.service, 'helpdesk-api');

    assert.ok(
        !Number.isNaN(Date.parse(response.body.timestamp))
    );
});