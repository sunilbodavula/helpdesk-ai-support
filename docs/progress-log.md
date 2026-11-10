# Helpdesk and AI Support System — Progress Log

## Day 1 — Project Foundation

**Status:** Completed

### Completed
- Established the initial project structure.
- Created the project documentation.
- Initialized Git and committed the project foundation.
- Created the GitHub repository and pushed the project.

### Technologies Planned
- Frontend: React.js
- Backend: Node.js and Express.js
- Database: PostgreSQL
- Containerization: Docker
- CI/CD: GitHub Actions
- Cloud: AWS
- AI integration: LLM APIs and retrieval-augmented generation (RAG)

### Next Steps
- Review the project architecture.
- Set up the backend application.
- Configure environment variables and database connectivity.
- Implement the first backend API and test it.

## Day 2 — Express API Foundation

- Created the Express application and server startup.
- Implemented `GET /health` with a JSON response.
- Added an automated API test using Node.js's test runner and Supertest.
- Added an environment configuration template.
- Verified the health endpoint locally.
- Automated test: 1 passed, 0 failed.
- Next: Design the PostgreSQL schema and implement database migrations.

## Day 3 — PostgreSQL Development Environment

- Added a Docker Compose configuration for PostgreSQL 16.
- Configured local database environment variables.
- Added persistent database storage using a named Docker volume.
- Added a PostgreSQL health check.
- Verified database connectivity using psql.
- Next: Integrate PostgreSQL with Express and implement database migrations.

## Day 4 — Express and PostgreSQL Integration

- Installed the PostgreSQL Node.js driver.
- Created a reusable database connection pool.
- Added a database readiness endpoint.
- Added graceful database pool shutdown.
- Verified database connectivity through the Express API.
- Automated tests: 1 passed, 0 failed.
- Next: Create version-controlled database migrations and the initial helpdesk schema.

## Day 5 — First Database Migration

- Created the initial tickets table migration.
- Added primary key, required fields, status and priority constraints.
- Applied the migration to the local PostgreSQL database.
- Verified the table structure and tested inserting and retrieving a ticket.

- Implemented POST /api/tickets to create support tickets.
- Added input validation for title, description, and priority.
- Integrated ticket creation with PostgreSQL using parameterized SQL queries.
- Used INSERT ... RETURNING to retrieve the newly created ticket.
- Fixed an asynchronous JavaScript issue by adding await to the database query.
- Implemented GET /api/tickets to retrieve all support tickets.
- Added ticket count to the API response.
- Sorted tickets by creation time, with the newest tickets returned first.
- Verified that tickets were successfully created and persisted in PostgreSQL.
- Verified that the listing endpoint returned all four existing tickets.

## Day 6 – Ticket API Development

- Implemented the `POST /api/tickets` endpoint to create new support tickets.
- Implemented the `GET /api/tickets` endpoint to retrieve existing tickets.
- Added request validation for ticket title, description, and priority.
- Used parameterized SQL queries to interact with PostgreSQL safely.
- Used `INSERT ... RETURNING` to retrieve newly created ticket details.
- Debugged and fixed an asynchronous execution issue caused by a missing `await`.
- Verified ticket creation and retrieval through API testing.
- Confirmed that ticket records were successfully persisted in PostgreSQL.

## Day 7 – Automated API Validation Testing

- Started implementing automated tests for the ticket API.
- Added test cases for missing ticket titles, empty descriptions, and invalid priority values.
- Verified that invalid requests are handled correctly.
- Practised testing asynchronous API operations.
- Learned how database transactions and rollback help maintain database consistency during testing.

## Day 8 – Pagination and Search

- Implemented pagination for the `GET /api/tickets` endpoint.
- Used SQL `LIMIT` and `OFFSET` to retrieve records page by page.
- Added title-based search functionality using PostgreSQL `ILIKE`.
- Used parameterized queries for search operations.
- Added validation for page number, page size, and search input.
- Included pagination metadata in the API response.
- Tested pagination, searching, and invalid query parameters.

## Day 9 – Integration Testing and Database Configuration Fix

- Expanded automated API testing using Node.js built-in test runner and Supertest.
- Added integration tests for ticket pagination and title-based search.
- Tested different pages, search results, and invalid query parameters.
- Identified a PostgreSQL connection failure during automated testing.
- Investigated the issue and found that tests imported the application directly without loading the root `.env` file.
- Fixed environment variable loading in the database connection pool.
- Successfully executed all 10 automated API tests.

**Key learning:** Understood why an application can work when started through its server entry point but fail during automated testing due to differences in application initialization and environment configuration.

## Day 10 – PostgreSQL Indexing and Query Performance

- Started reviewing PostgreSQL indexing strategies for the ticket management API.
- Identified pagination, sorting, and title search as important query-performance areas.
- Studied the purpose of B-tree, GIN, and composite indexes.
- Began investigating existing database indexes.
- Introduced EXPLAIN ANALYZE for understanding PostgreSQL query execution plans.
- Next: identify appropriate indexes based on actual query patterns and execution plans.