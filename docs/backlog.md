# Development Backlog

Priorities:
- P0: Required for the initial working application
- P1: Required for a stronger production-minded application
- P2: Advanced features and improvements

## Epic 1: Project Foundation

- [ ] P0: Create repository and documentation.
- [ ] P0: Establish frontend and backend folder structure.
- [ ] P0: Add environment configuration conventions.
- [ ] P0: Add a backend health endpoint.
- [ ] P0: Add consistent npm scripts and basic automated checks.

Acceptance criteria:
- The project structure is documented.
- The API can start locally.
- The health endpoint returns a successful response.
- No secrets are committed.

## Epic 2: Database and Persistence

- [ ] P0: Design the users and tickets schema.
- [ ] P0: Add versioned SQL migrations.
- [ ] P0: Configure PostgreSQL connectivity.
- [ ] P0: Implement ticket persistence.
- [ ] P1: Add comments and audit history.
- [ ] P1: Add indexes based on query patterns.

Acceptance criteria:
- Migrations can be applied to a clean database.
- Invalid relationships are rejected by database constraints.
- Queries use parameterized inputs.
- Important operations are covered by tests.

## Epic 3: Ticket REST API

- [ ] P0: Create a ticket.
- [ ] P0: Retrieve a ticket by ID.
- [ ] P0: List tickets.
- [ ] P0: Update permitted ticket fields.
- [ ] P0: Add request validation and consistent errors.
- [ ] P1: Add filtering, search, and pagination.
- [ ] P1: Add assignment and ticket history.

Acceptance criteria:
- Valid requests return documented responses.
- Invalid requests return appropriate client errors.
- Missing tickets return 404.
- Users cannot access tickets they are not permitted to view.
- API behavior is covered by automated tests.

## Epic 4: React Frontend

- [ ] P0: Initialize the React application.
- [ ] P0: Build the ticket list.
- [ ] P0: Build the ticket creation form.
- [ ] P0: Build the ticket details page.
- [ ] P1: Add search, filters, and pagination.
- [ ] P1: Add loading, empty, and error states.
- [ ] P1: Improve accessibility and responsive layout.

Acceptance criteria:
- Users can create and view tickets through the UI.
- API errors are displayed clearly.
- Forms provide useful validation feedback.
- The UI does not contain backend secrets.

## Epic 5: Authentication and Security

- [ ] P0: Define the authentication and session strategy.
- [ ] P0: Implement login and logout.
- [ ] P0: Define employee, agent, and administrator roles.
- [ ] P0: Enforce authorization in the backend.
- [ ] P1: Add rate limiting and security headers.
- [ ] P1: Review CORS, cookie, and CSRF requirements.
- [ ] P1: Review input handling and sensitive logging.

Acceptance criteria:
- Unauthenticated requests cannot access protected operations.
- Users cannot perform unauthorized actions.
- Credentials and session data are protected.
- Security-sensitive behavior is tested.

## Epic 6: Testing and Observability

- [ ] P0: Add unit tests for business rules.
- [ ] P0: Add API integration tests.
- [ ] P1: Add structured logging.
- [ ] P1: Add request correlation identifiers.
- [ ] P1: Add database failure and timeout handling.
- [ ] P1: Add operational health checks.

Acceptance criteria:
- Tests run through documented commands.
- Failures produce useful diagnostic information.
- Logs do not expose secrets.
- Health checks distinguish application health from dependency health.

## Epic 7: Docker and CI/CD

- [ ] P0: Add Docker Compose for local development.
- [ ] P0: Containerize the API.
- [ ] P1: Containerize the frontend.
- [ ] P0: Add a GitHub Actions CI workflow.
- [ ] P1: Run tests and builds in CI.
- [ ] P1: Add dependency and security checks.

Acceptance criteria:
- The application can be started using documented container commands.
- CI fails when required checks fail.
- Secrets are not embedded in container images.
- Persistent database data is handled deliberately.

## Epic 8: AWS Deployment and Monitoring

- [ ] P1: Compare deployment options and estimate costs.
- [ ] P1: Select an initial deployment architecture.
- [ ] P1: Configure secrets and access permissions.
- [ ] P1: Deploy the application.
- [ ] P1: Configure logs, health monitoring, and alerts.
- [ ] P1: Document rollback and cleanup procedures.

Acceptance criteria:
- Deployment steps are reproducible.
- Credentials are not committed to GitHub.
- Logs and health checks are available.
- Resources and recurring costs are documented.

## Epic 9: AI Support

- [ ] P1: Define AI use cases and safety boundaries.
- [ ] P1: Integrate an LLM through the backend.
- [ ] P1: Add ticket classification suggestions.
- [ ] P1: Add response drafting for agent review.
- [ ] P2: Retrieve relevant approved support documentation using RAG.
- [ ] P2: Evaluate retrieval quality and answer grounding.
- [ ] P2: Introduce narrowly scoped, permission-checked tools.
- [ ] P2: Test prompt injection and unauthorized tool requests.

Acceptance criteria:
- AI output is validated and treated as untrusted.
- Provider credentials remain on the server.
- Retrieved information respects access permissions.
- Tool execution checks authorization independently of the model.
- Sensitive state-changing actions require appropriate confirmation.
- AI failures do not make basic ticket management unavailable.

## Day 1 Completion

- [ ] Environment checked.
- [ ] Repository folders created.
- [ ] README and architecture documented.
- [ ] Backlog and progress log created.
- [ ] Initial Git commit created.
- [ ] Repository pushed to GitHub.
