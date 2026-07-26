# AttendX System Architecture

## Architecture Diagram Overview

```text
React Frontend
        │
        ▼
Express API
        │
        ├──────── MongoDB Atlas
        ├──────── Cloudinary
        ├──────── OpenAI
        └──────── Socket.io
```

## Security & RBAC Guard Rails
- **Authentication**: JWT Bearer Tokens with expiration.
- **Authorization**: Middleware checks role scopes (`admin`, `hr`, `employee`).
- **Data Integrity**: `express-mongo-sanitize` prevents NoSQL injection attacks.
- **Audit Logging**: Every administrative mutation and AI action is saved to the `AuditLog` collection.
