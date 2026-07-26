# AttendX API Specifications

Full interactive OpenAPI 3.0 documentation is available live at `/api/docs`.

## Key Endpoint Summary

### System & Health
- `GET /health`: System metrics, DB ping, uptime, CPU/memory usage.
- `GET /api/docs`: Interactive Swagger UI.

### Auth & Employees
- `POST /api/auth/login`: User login & JWT issuance.
- `GET /api/users`: Search & filter employee directory.
- `GET /api/profile/:id`: Retrieve detailed employee profile.

### Operations & Support
- `GET /api/attendance`: Shift attendance records.
- `GET /api/leaves`: Leave applications pipeline.
- `GET /api/payroll/slips`: Monthly payslip summaries.
- `GET /api/helpdesk/tickets`: Service Desk ticket directory.
- `POST /api/ai/chat`: AI Assistant natural language query parser.
- `POST /api/ai/action`: Execute AI action with confirmation & audit logging.
- `GET /api/audit-logs`: System audit trail & security events.
