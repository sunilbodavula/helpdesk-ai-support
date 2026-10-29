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
    try {
        const query = `
            SELECT id, title, description, status, priority,
                created_at, updated_at
            FROM tickets
            ORDER BY created_at DESC, id DESC;
        `;

        const result = await pool.query(query);

        return res.status(200).json({
            count: result.rows.length,
            tickets: result.rows,
        });
    }catch(error){
        console.error('Failed to load tickets: ', error.message);

        return res.status(500).json({
            error: 'Unable to retrieve tickets. Please try again later.',
        });
    }
}

module.exports = { createTicket, listTickets };