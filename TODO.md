# TODO - Phase 2: RBAC + Users + Leaves

## Phase 2 Scope

### Backend
- Role-protected routes using existing JWT auth middleware (`backend/middleware/auth.js`) and role-protected middleware (`backend/middleware/roles.js`)
- Add user management APIs:
  - GET    /api/users
  - GET    /api/users/:id
  - POST   /api/users
  - PUT    /api/users/:id
  - DELETE /api/users/:id
- Role rules:
  - Admin: all user routes
  - HR: view-only users (GET only)
  - Employee: forbidden (all user routes)
- Leave management:
  - Create `backend/models/Leave.js`
  - Add APIs:
    - POST /api/leaves
    - GET  /api/leaves
    - PUT  /api/leaves/:id/approve
    - PUT  /api/leaves/:id/reject
  - Role rules:
    - Employee: create/view own leaves only
    - HR/Admin: view all leaves
    - Admin/HR: approve/reject

## Phase 2 Progress
- [x] Backend users routes + wiring
- [x] Backend leaves model + routes + wiring
- [x] Frontend RBAC sidebar hiding by role
- [x] Frontend role-based route guarding + unauthorized page already exists


### Frontend
- Role-based sidebar navigation
- Hide menu items based on role stored in Zustand from JWT login response
- Add redirect behavior to `/unauthorized` when forbidden

---

## Implementation Steps (in order)

### Step 1 — Add backend user routes
- Create `backend/routes/users.js`
- Use `auth` middleware + role checking:
  - Admin: allow all CRUD
  - HR: allow only GET list + GET by id
  - Employee: always 403
- Ensure responses:
  - 401 if no/invalid token (handled by `auth` middleware)
  - 403 if role mismatch
- Keep password hashing intact when creating/updating users (use bcryptjs pre-save or hash on update)

### Step 2 — Wire users routes into server
- Update `backend/server.js`
  - `app.use('/api/users', usersRoutes)`

### Step 3 — Add backend leave model
- Create `backend/models/Leave.js`
  - Fields:
    - employeeId (ObjectId -> User)
    - leaveType
    - startDate
    - endDate
    - reason
    - status: pending|approved|rejected

### Step 4 — Add backend leave routes
- Create `backend/routes/leaves.js`
- Endpoints:
  - POST /api/leaves
    - Employee: employeeId is req.user.userId (employee cannot pass another employeeId)
    - HR/Admin: can create for any employeeId (if employeeId provided)
  - GET /api/leaves
    - Employee: only own leaves
    - HR/Admin: all leaves
  - PUT /api/leaves/:id/approve
    - Admin/HR only
    - Sets status=approved
  - PUT /api/leaves/:id/reject
    - Admin/HR only
    - Sets status=rejected

### Step 5 — Wire leave routes into server
- Update `backend/server.js`
  - `app.use('/api/leaves', leavesRoutes)`

### Step 6 — Frontend RBAC sidebar
- Update `src/components/Sidebar.js`
- Menu items controlled by role:
  - Admin: Dashboard, Employees, Attendance, Leave, Reports, Settings
  - HR: Dashboard, Employees, Leave, Reports (Attendance optional), Settings optional
  - Employee: Attendance (own), Leave (own), Settings (optional)
- Hide items not permitted.

### Step 7 — Frontend route guards
- Update `src/components/ProtectedRoute.js`
- Ensure if token exists but route is forbidden -> navigate to `/unauthorized`

### Step 8 — Add missing Unauthorized behavior
- Confirm `/unauthorized` stays reachable.

### Step 9 — Testing
- Backend tests (manual curl/postman):
  - Admin JWT can access all /api/users routes
  - HR JWT can GET /api/users but cannot POST/PUT/DELETE
  - Employee JWT gets 403 for /api/users
  - Employee can POST /api/leaves and GET only own
  - HR/Admin can GET all leaves
  - HR/Admin can approve/reject leaves

- Frontend tests (manual):
  - Login as each role and verify sidebar visibility + redirects

