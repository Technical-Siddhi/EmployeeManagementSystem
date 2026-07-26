# AttendX System Architecture

## Architecture Diagram Overview

```text
[ React Frontend (Tailwind + Lucide) ]
                 │
            (HTTPS / JSON)
                 │
                 ▼
[ Express.js REST API & Middlewares ]
   ├── Helmet & Security Headers
   ├── Rate Limiting & Mongo Sanitize
   ├── Morgan & Winston Logging
   └── Swagger OpenAPI Specs (/api/docs)
                 │
                 ├──► [ MongoDB Atlas Database ]
                 ├──► [ Cloudinary File Storage ]
                 └──► [ OpenAI Assistant Engine ]
```

## Security & RBAC Guard Rails
- **Authentication**: JWT Bearer Tokens with expiration.
- **Authorization**: Middleware checks role scopes (`admin`, `hr`, `employee`).
- **Data Integrity**: `express-mongo-sanitize` prevents NoSQL injection attacks.
- **Audit Logging**: Every administrative mutation and AI action is saved to the `AuditLog` collection.
