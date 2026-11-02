const pool = require('../db/pool');

const ALLOWED_PRIORITIES = ['low', 'medium', 'high', 'urgent'];

async function createTicket(req, res){
    const {title, description, priority = 'medium'} = req.body;

    //validate title
    if(typeof title != 'string' || !title.trim()){
        return res.status(400).json({
            error: 'Title is required and must be a non-empty string.',
        });
    }

    if(title.trim().length > 200){
        return res.status(400).json({
            error: 'Title must not exceed 200 characters',
        });
    }

    //validate description
    if(typeof description != 'string' || !description.trim()){
        return res.status(400).json({
            error: 'Description is required and must be a non-empty string',
        });
    }

    //validate priority
    if(typeof priority != 'string' || !ALLOWED_PRIORITIES.includes(priority)){
        return res.status(400).json({
            error: 'Priority must be low, medium, high or urgent.',
        });
    }

    try{
        const query = `
            INSERT INTO tickets (title, description, priority)
            VALUES ($1, $2, $3)
            RETURNING id, title, description, status, priority, created_at, updated_at
        `;

        const value = [
            title.trim(),
            description.trim(),
            priority
        ]

        const result = await pool.query(query, value);

        return res.status(201).json({
            message: 'Ticket created successfully',
            ticket: result.rows[0],
        });
    }catch(error){
        console.error('Failed to create a ticket: ' + error.message);

        return res.status(500).json({
            error: 'Unable to create a ticket, please try again later.',
        });
    }
}

async function listTickets(req, res){
    //read and validate pagination parameters
    const pageValue = req.query.page ?? '1';
    const pageSizeValue = req.query.pageSize ?? '10';

    if(typeof pageValue !== 'string' || !/^[1-9]\d*$/.test(pageValue)){
        return res.status(400).json({
            error: 'Page must be a positive integer.',
        });
    }

    if(typeof pageSizeValue !== 'string' || !/^[1-9]\d*$/.test(pageSizeValue)){
        return res.status(400).json({
            error: 'Page size must be a positive integer.',
        });
    }

    const page = Number(pageValue);
    const pageSize = Number(pageSizeValue);

    if(
        !Number.isSafeInteger(page) ||
        !Number.isSafeInteger(pageSize) ||
        pageSize > 100 ||
        !Number.isSafeInteger((page - 1) * pageSize)
    ){
        return res.status(400).json({
            error: 'Invalid pagination parameters',
        })
    }

    //Read and validate the search term.
    const search = req.query.search ?? '';

    if(typeof search !== 'string' || search.trim().length > 100){
        return res.status(400).json({
            error: 'Search must be a string of at most 100 characters',
        });
    }

    const searchPattern = `%${search.trim()}%`;
    const offset = (page - 1) * pageSize;

    try {
        const countQuery = `
            SELECT COUNT(*)::int AS total
            FROM tickets
            WHERE title ILIKE $1
        `;

        const ticketQuery = `
        SELECT 
            id,
            title, 
            description,
            status,
            priority,
            created_at,
            updated_at
        FROM tickets 
        WHERE title ILIKE $1
        ORDER BY created_at DESC, id DESC
        LIMIT $2
        OFFSET $3
        `;

        const [countResult, ticketResult] = await Promise.all([
            pool.query(countQuery, [searchPattern]),
            pool.query(ticketQuery, [
                searchPattern,
                pageSize,
                offset,
            ]),
        ]);

        const total = countResult.rows[0].total;

        return res.status(200).json({
            page,
            pageSize,
            total,
            totalPages: Math.ceil(total / pageSize),
            tickets: ticketResult.rows,
        });
    }catch(error){
        console.error('Failed to list tickets: ', error.message);

        return res.status(500).json({
            error: 'Unable to retrieve tickets. Please try again later.',
        });
    }
}

module.exports = { createTicket, listTickets };