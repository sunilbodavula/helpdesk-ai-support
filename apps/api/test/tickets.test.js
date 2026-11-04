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

test('GET /api/tickets/ return paginated results', async () => {
    const response = await request(app)
    .get('/api/tickets')
    .query({
        page: 1,
        pageSize: 2,
    });

    assert.equal(response.status, 200);

    assert.equal(response.body.page, 1);
    assert.equal(response.body.pageSize, 2);

    assert.ok(Number.isInteger(response.body.total));
    assert.ok(Array.isArray(response.body.tickets));

    assert.ok(response.body.tickets.length <= 2);

    assert.equal(
        response.body.totalPages,
        Math.ceil(response.body.total / 2)
    );
});

test('GET /api/tickets returns different records on different pages', async() => {
    const firstPage = await request(app)
    .get('/api/tickets')
    .query({
        page: 1,
        pageSize: 2,
    });

    const secondPage = await request(app)
    .get('/api/tickets')
    .query({
        page: 2,
        pageSize: 2,
    });

    assert.equal(firstPage.status, 200);
    assert.equal(secondPage.status, 200);

    const firstPageIds = firstPage.body.tickets.map(ticket => ticket.id);
    const secodePageIds = secondPage.body.tickets.map(ticket => ticket.id);

    for(const id of secodePageIds){
        assert.ok(
            !firstPageIds.includes(id),
            `Ticket ${id} appeared on both pages`
        );
    };
});

test('GET /api/tickets searches ticket by title', async() => {
    const response = await request(app)
    .get('/api/tickets')
    .query({
        search: 'dashboard',
        page: 1,
        pageSize: 10,
    });

    assert.equal(response.status, 200);

    assert.ok(Array.isArray(response.body.tickets));

    for(const ticket of response.body.tickets){
        assert.ok(
            ticket.title.toLowerCase().includes('dashboard')
        );
    };

    assert.ok(response.body.total >= response.body.tickets.length);

    assert.equal(
        response.body.totalPages,
        Math.ceil(response.body.total / 10)
    );
});

test('GET /api/tickets rejects an invalid page number', async() => {
    const response = await request(app)
    .get('/api/tickets')
    .query({
        page: 'abc',
    });

    assert.equal(response.status, 400);

    assert.equal(
        response.body.error,
        'Page must be a positive integer.'
    );
});

test('GET /api/tickets rejects page size greater than 100', async() => {
    const response = await request(app)
    .get('/api/tickets')
    .query({
        pageSize: 101,
    });

    assert.equal(response.status, 400);

    assert.equal(
        response.body.error,
        'Invalid pagination parameters'
    );
});

test('GET /api/tickets rejects search terms longer than 100 characters', async() => {
    const longSearch = 'a'.repeat(101);

    const response = await request(app)
    .get('/api/tickets')
    .query({
        search: longSearch
    });

    assert.equal(response.status, 400);

    assert.equal(
        response.body.error,
        'Search must be a string of at most 100 characters'
    );
});