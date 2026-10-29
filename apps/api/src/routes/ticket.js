const express = require('express');
const { createTicket, listTickets } = require('../controllers/ticketController');

const router = express.Router();

router.get('/', listTickets);
router.post('/', createTicket);

module.exports = router;