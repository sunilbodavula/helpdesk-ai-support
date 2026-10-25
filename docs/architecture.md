# Architecture

## 1. Architectural Style

The application starts as a modular monolith.

The frontend and backend are separate applications. The backend
contains modules for authentication, tickets, comments, knowledge
retrieval, and AI assistance.

## 2. Request Flow

1. A user interacts with the React frontend.
2. The frontend sends an HTTP request to the Express API.
3. Middleware performs request parsing, validation, authentication,
   and other applicable checks.
4. The service layer enforces business rules.
5. The data-access layer communicates with PostgreSQL.
6. The API returns an appropriate HTTP response.
7. The frontend displays the result.

## 3. Planned Components

- React frontend
- Express REST API
- PostgreSQL database
- SQL migration scripts
- Authentication and authorization middleware
- Automated tests
- Docker Compose for local development
- GitHub Actions for continuous integration
- AWS deployment and monitoring
- Backend AI integration

## 4. Planned Database Entities

### users
Stores user identity, account information, and role.

### tickets
Stores the ticket title, description, category, priority, status,
creator, assignee, and timestamps.

### ticket_comments
Stores messages associated with a ticket.

### ticket_events
Stores important ticket state changes for audit history.

### knowledge_articles
Stores approved support documentation and metadata.

### ai_interactions
Stores appropriate metadata about AI assistance, such as operation
type, outcome, and timestamps. Sensitive prompts and responses will
not be retained unnecessarily.

Relationships and constraints will be defined through SQL migrations.

## 5. API Design

The backend will expose versioned REST endpoints under `/api/v1`.

Planned endpoints include:

- POST /api/v1/auth/login
- POST /api/v1/tickets
- GET /api/v1/tickets
- GET /api/v1/tickets/:id
- PATCH /api/v1/tickets/:id
- POST /api/v1/tickets/:id/comments

Authentication, validation, pagination, and authorization requirements
will be defined before these endpoints are implemented.

## 6. AI Architecture

AI requests will be sent through the backend.

The backend will:
- Authenticate the requesting user.
- Check the user's permissions.
- Limit the information sent to the AI provider.
- Retrieve approved documentation when RAG is introduced.
- Validate tool arguments.
- Restrict tools through an explicit allowlist.
- Recheck authorization before executing an operation.
- Audit important actions.
- Require confirmation for sensitive state-changing operations.

AI-generated content will be treated as untrusted and reviewed where
appropriate.

## 7. Security Principles

- Store secrets in environment variables during local development.
- Commit an `.env.example` file, never real credentials.
- Validate and constrain incoming data.
- Use parameterized SQL queries.
- Apply least-privilege database access.
- Enforce authorization in the backend.
- Protect authentication credentials and sessions.
- Avoid logging passwords, tokens, or unnecessary personal information.
- Apply appropriate request limits and security headers.
- Do not let an AI model bypass application permissions.

## 8. Delivery Plan

1. Repository and documentation
2. API foundation and health endpoint
3. Database schema and migrations
4. Ticket CRUD APIs
5. React frontend
6. Authentication and authorization
7. Validation, testing, and logging
8. Search, pagination, and comments
9. Docker Compose
10. GitHub Actions
11. AWS deployment and monitoring
12. AI classification and response drafting
13. RAG and controlled tool calling
