# AttendX Enterprise Database Documentation

**MongoDB Atlas Database Architecture & Entity Relationship Specifications**

---

## 1. High-Level Database Architecture

AttendX utilizes **MongoDB Atlas** as its multi-tenant document database. The schema is organized into modular domain collections linked via Mongoose `ObjectId` references (`ref`), utilizing embedding for performance-critical child entities and referencing for normalized core domain entities.

```text
+-----------------------------------------------------------------------------------+
|                              AttendX Database Engine                              |
|                              (MongoDB Atlas Cluster)                              |
+-----------------------------------------------------------------------------------+
        │                      │                      │                      │
        ▼                      ▼                      ▼                      ▼
┌───────────────┐      ┌───────────────┐      ┌───────────────┐      ┌───────────────┐
│ Core & Auth   │      │ Workforce & HR│      │ Operations    │      │ Intelligence  │
├───────────────┤      ├───────────────┤      ├───────────────┤      ├───────────────┤
│ Users         │      │ Employees     │      │ Attendance    │      │ Help Desk     │
│ Roles         │      │ Departments   │      │ Leaves        │      │ Audit Logs    │
│ Permissions   │      │ Teams         │      │ Payroll       │      │ AI Assistant  │
│ Documents     │      │ Designations  │      │ Performance   │      │ Notifications │
└───────────────┘      └───────────────┘      └───────────────┘      └───────────────┘
```

---

## 2. Complete Entity Relationship Diagram (ERD)

```text
┌─────────────────┐       1:1        ┌─────────────────┐       1:M        ┌─────────────────┐
│     User        │ ──────────────── │    Employee     │ ──────────────── │   Attendance    │
└─────────────────┘                  └────────┬────────┘                  └─────────────────┘
                                              │
                    ┌─────────────────────────┼─────────────────────────┐
                    │ 1:M                     │ 1:M                     │ 1:M
                    ▼                         ▼                         ▼
           ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
           │     Leave       │       │     Payroll     │       │   Performance   │
           └─────────────────┘       └─────────────────┘       └─────────────────┘
                    ▲                         ▲                         ▲
                    │ M:1                     │ M:1                     │ M:1
           ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
           │   Department    │       │     Team        │       │   Designation   │
           └─────────────────┘       └─────────────────┘       └─────────────────┘
                    │                         │
                    └────────────┬────────────┘
                                 │ 1:M
                                 ▼
                        ┌─────────────────┐
                        │ HelpDesk Ticket │
                        └─────────────────┘
                                 │ 1:M
                                 ▼
                        ┌─────────────────┐
                        │ AI Conversation │
                        └─────────────────┘
```

---

## 3. Employee Relationship Diagram

```text
                     ┌──────────────────┐
                     │   Department     │
                     └────────┬─────────┘
                              │ 1:M
                              ▼
┌──────────────────┐ 1:1 ┌──────────────────┐ 1:M ┌──────────────────┐
│   Designation    │ ◄───│     Employee     │ ───►│  EmployeeProfile │
└──────────────────┘     └────────┬─────────┘     └──────────────────┘
                                  │ 1:M
                                  ▼
                         ┌──────────────────┐
                         │ EmployeeDocument │
                         └──────────────────┘
```

| Parent Entity | Child Entity | Cardinality | Join Reference Key | Description |
| --- | --- | --- | --- | --- |
| `Employee` | `User` | 1:1 | `user` (`ObjectId`) | Links authentication identity to HR employee profile |
| `Employee` | `Department` | M:1 | `department` (`ObjectId`) | Department organizational unit mapping |
| `Employee` | `Team` | M:1 | `team` (`ObjectId`) | Functional team assignment |
| `Employee` | `Designation` | M:1 | `designation` (`ObjectId`) | Employee job title and pay grade |
| `Employee` | `EmployeeProfile` | 1:1 | `employee` (`ObjectId`) | Detailed biography, address, emergency contacts |
| `Employee` | `EmployeeDocument` | 1:M | `employee` (`ObjectId`) | Uploaded verification documents and contracts |

---

## 4. Attendance Database Diagram

```text
┌──────────────────┐
│     Employee     │
└────────┬─────────┘
         │ 1:M
         ▼
┌──────────────────┐ 1:1 ┌──────────────────┐
│   Attendance     │ ───►│   Shift Roster   │
└────────┬─────────┘     └──────────────────┘
         │ 1:M
         ▼
┌──────────────────┐ 1:M ┌──────────────────┐
│  Break Session   │ ───►│ Overtime Record  │
└──────────────────┘     └──────────────────┘
```

| Parent Entity | Child Entity | Cardinality | Join Reference Key | Description |
| --- | --- | --- | --- | --- |
| `Employee` | `Attendance` | 1:M | `employee` (`ObjectId`) | Daily check-in/check-out logs |
| `Attendance` | `Shift` | M:1 | `shift` (`ObjectId`) | Assigned shift schedule and grace period |
| `Attendance` | `BreakSession` | 1:M | `attendance` (`ObjectId`) | Intra-day break timestamps (lunch, tea) |
| `Attendance` | `Overtime` | 1:M | `attendance` (`ObjectId`) | Approved extra hours worked |

---

## 5. Payroll Database Diagram

```text
┌──────────────────┐ 1:1 ┌──────────────────┐
│ SalaryStructure  │ ───►│    Employee      │
└──────────────────┘     └────────┬─────────┘
                                  │ 1:M
                                  ▼
┌──────────────────┐ 1:M ┌──────────────────┐
│     Payslip      │ ◄───│     Payroll      │
└──────────────────┘     └────────┬─────────┘
                                  │ 1:M
                                  ▼
                         ┌──────────────────┐
                         │ Bonus & Deduction│
                         └──────────────────┘
```

| Parent Entity | Child Entity | Cardinality | Join Reference Key | Description |
| --- | --- | --- | --- | --- |
| `Employee` | `SalaryStructure` | 1:1 | `employee` (`ObjectId`) | Basic, HRA, special allowance definitions |
| `Payroll` | `Employee` | M:1 | `employee` (`ObjectId`) | Monthly payroll execution reference |
| `Payroll` | `Payslip` | 1:1 | `payroll` (`ObjectId`) | Generated PDF slip hash & distribution state |
| `Payroll` | `Bonus` / `Deduction` | 1:M | `payroll` (`ObjectId`) | Line item adjustments applied to month |

---

## 6. Performance Module Diagram

```text
┌──────────────────┐ 1:M ┌──────────────────┐
│     Employee     │ ───►│PerformanceReview │
└────────┬─────────┘     └────────┬─────────┘
         │                        │
         │ 1:M                    │ 1:M
         ▼                        ▼
┌──────────────────┐     ┌──────────────────┐
│       Goal       │ ───►│    Feedback360   │
└────────┬─────────┘     └──────────────────┘
         │ 1:M
         ▼
┌──────────────────┐
│       KPI        │
└──────────────────┘
```

---

## 7. Help Desk Database Diagram

```text
┌──────────────────┐
│     Employee     │
└────────┬─────────┘
         │ 1:M
         ▼
┌──────────────────┐ 1:M ┌──────────────────┐
│      Ticket      │ ───►│  TicketComment   │
└────────┬─────────┘     └──────────────────┘
         │ 1:1
         ▼
┌──────────────────┐
│   TicketRating   │
└──────────────────┘
```

---

## 8. Audit & Security Database Diagram

```text
┌──────────────────┐
│     Employee     │
└────────┬─────────┘
         │ 1:M
         ▼
┌──────────────────┐ 1:M ┌──────────────────┐
│    AuditLog      │ ───►│  SecurityEvent   │
└──────────────────┘     └──────────────────┘
```

---

## 9. AI Module Database Diagram

```text
┌──────────────────┐
│     Employee     │
└────────┬─────────┘
         │ 1:M
         ▼
┌──────────────────┐ 1:M ┌──────────────────┐
│  AIConversation  │ ───►│   AIActionLog    │
└──────────────────┘     └──────────────────┘
```

---

## 10. Complete Collection Specifications & Indexing Strategies

### 1. `Users`
- **Primary Key**: `_id` (`ObjectId`)
- **Indexes**:
  - `email` (Unique, Ascending)
  - `role` (Ascending)
- **References**: `role` -> `Role._id`

### 2. `Employees`
- **Primary Key**: `_id` (`ObjectId`)
- **Indexes**:
  - `user` (Unique, Ascending)
  - `department` (Ascending)
  - `employeeId` (Unique, Ascending)
- **References**:
  - `user` -> `User._id`
  - `department` -> `Department._id`
  - `team` -> `Team._id`
  - `designation` -> `Designation._id`

### 3. `Attendance`
- **Primary Key**: `_id` (`ObjectId`)
- **Indexes**:
  - Compound Index: `{ employee: 1, date: -1 }` (Unique)
  - `status` (Ascending)

### 4. `Leaves`
- **Primary Key**: `_id` (`ObjectId`)
- **Indexes**:
  - Compound Index: `{ applicant: 1, status: 1 }`
  - `startDate` (Descending)

### 5. `Payroll`
- **Primary Key**: `_id` (`ObjectId`)
- **Indexes**:
  - Compound Index: `{ employee: 1, month: 1, year: 1 }` (Unique)

### 6. `HelpDesk`
- **Primary Key**: `_id` (`ObjectId`)
- **Indexes**:
  - `ticketNumber` (Unique, Ascending)
  - `{ requester: 1, status: 1 }`

### 7. `AuditLogs`
- **Primary Key**: `_id` (`ObjectId`)
- **Indexes**:
  - `timestamp` (Descending)
  - `user` (Ascending)

### 8. `AIConversations`
- **Primary Key**: `_id` (`ObjectId`)
- **Indexes**:
  - Compound Index: `{ user: 1, sessionId: 1 }`

---

## 11. Example Mongoose Schema References

```javascript
// Employee Schema Reference Example
const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
  designation: { type: mongoose.Schema.Types.ObjectId, ref: 'Designation' },
  status: { type: String, enum: ['Active', 'OnLeave', 'Terminated'], default: 'Active' }
}, { timestamps: true });
```
