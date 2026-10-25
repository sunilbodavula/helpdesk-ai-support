# Helpdesk and AI Support System

A portfolio project demonstrating full-stack development, REST APIs,
database design, security, automated testing, CI/CD, cloud deployment,
and practical AI integration.

## 1. Problem Statement

Organizations need a reliable way to manage employee support requests.
This application provides a central platform for creating, assigning,
tracking, and resolving support tickets.

AI capabilities will help support agents classify tickets, retrieve
relevant documentation, and draft responses for human review.

## 2. Technology Stack

- Frontend: React
- Backend: Node.js and Express
- Database: PostgreSQL
- Database migrations: SQL
- Containers: Docker and Docker Compose
- Version control: Git and GitHub
- CI/CD: GitHub Actions
- Cloud deployment: AWS
- AI: LLM API, retrieval-augmented generation (RAG), and controlled tool calling

## 3. Planned Features

- User authentication and role-based authorization
- Ticket creation, retrieval, updates, and assignment
- Ticket comments and audit history
- Validation and centralized error handling
- Search, filtering, and pagination
- Automated unit and integration tests
- Structured logging and security controls
- Docker-based local development
- GitHub Actions CI pipeline
- Cost-conscious AWS deployment
- AI-assisted ticket classification and response drafting
- Retrieval of answers from approved support documentation
- Permission-checked AI tool calling

## 4. Architecture

The React frontend communicates with the Express REST API.
The backend validates requests, enforces permissions, applies business
rules, and accesses PostgreSQL.

AI requests are routed through the backend. Provider credentials must
never be exposed in frontend code.

See [docs/architecture.md](docs/architecture.md).

## 5. Repository Structure

- `apps/web/` - React frontend
- `apps/api/` - Node.js and Express backend
- `database/migrations/` - SQL database migrations
- `docs/` - Architecture and project documentation
- `infra/docker/` - Docker configuration
- `scripts/` - Development and maintenance scripts
- `.github/workflows/` - GitHub Actions workflows

## 6. Development Status

Current milestone: Project foundation and repository setup.

The application code, database migrations, automated tests, and
deployment workflows will be implemented incrementally.

## 7. Engineering Principles

- Validate untrusted input.
- Use parameterized SQL queries.
- Enforce authentication and authorization on the backend.
- Keep secrets out of source control.
- Apply database changes through versioned migrations.
- Test important business rules and API behavior.
- Log useful operational information without exposing sensitive data.
- Treat AI output as untrusted input.
- Restrict AI tools to explicitly allowed operations.
- Require appropriate authorization and confirmation for sensitive actions.

## 8. Project Backlog

See [docs/backlog.md](docs/backlog.md).

## 9. Progress Log

See [docs/progress-log.md](docs/progress-log.md).

## 10. License

A license will be selected before the repository is published as an
open-source project.
