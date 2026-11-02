const test = require('node:test');
const assert = require('node:assert/strict');
const request = require('supertest');

const app = require('../src/app');

test('POST /api/tickets rejects a missing title', async() => {
    const response = await request(app)
    .post('/api/tickets')
    .send({
        description: 'The Dashboard displays an error',
        priority: 'high',
    });

    assert.equal(response.status, 400);

    assert.equal(
        response.body.error,
        'Title is required and must be a non-empty string.'
    );
});

test('POST /api/tickets rejects an invalid priority', async() => {
    const response = await request(app)
    .post('/api/tickets')
    .send({
        title: 'Cannot access dashboard',
        description: 'The Dashboard displays an error.',
        priority: 'critical',
    });

    assert.equal(response.status, 400);

    assert.equal(
        response.body.error,
        'Priority must be low, medium, high or urgent.'
    );
});

test('POST /api/tickets rejects a missing description', async() => {
    const response = await request(app)
    .post('/api/tickets')
    .send({
        title: 'Cannot access dashboard',
        description: '',
        priority: 'high',
    });

    assert.equal(response.status, 400);

    assert.equal(
        response.body.error,
        'Description is required and must be a non-empty string'
    );
});