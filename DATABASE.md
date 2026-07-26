# AttendX Enterprise Database & ER Diagram Documentation

**AI-Powered Enterprise Workforce Management Platform**

![Database ER Diagram](./database-er-diagram.svg)

---

## 📁 Diagram Artifact Files
- 🖼️ **SVG ER Diagram**: [database-er-diagram.svg](./database-er-diagram.svg)
- 📐 **Draw.io Editable File**: [database-er-diagram.drawio](./database-er-diagram.drawio)

---

## 1. High-Level Database Diagram

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
│ User          │      │ Employee      │      │ Attendance    │      │ Ticket        │
│ Role          │      │ Department    │      │ Leave         │      │ AuditLog      │
│ Permission    │      │ Team          │      │ Payroll       │      │ AIConversation│
│ Document      │      │ Designation   │      │ Performance   │      │ Notification  │
└───────────────┘      └───────────────┘      └───────────────┘      └───────────────┘
```

---

## 2. Complete Enterprise ER Diagram

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

## 3. Employee Module ER Diagram

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

| Collection Name | Primary Key | Foreign References | Important Fields | Indexes | Relationship Type |
| --- | --- | --- | --- | --- | --- |
| `Employee` | `_id` | `user`, `department`, `team`, `designation` | `firstName`, `lastName`, `status` | `{ user: 1 }`, `{ department: 1 }` | 1:1 (User), M:1 (Dept/Team) |
| `EmployeeProfile` | `_id` | `employee` | `bio`, `emergencyContacts`, `address` | `{ employee: 1 }` (Unique) | 1:1 (Employee) |
| `EmployeeDocument` | `_id` | `employee` | `title`, `url`, `verificationHash` | `{ employee: 1 }` | 1:M (Employee) |

---

## 4. Attendance Module ER Diagram

```text
┌──────────────────┐ 1:M ┌──────────────────┐ 1:1 ┌──────────────────┐
│     Employee     │ ───►│    Attendance    │ ───►│   Shift Roster   │
└──────────────────┘     └────────┬─────────┘     └──────────────────┘
                                  │ 1:M
                                  ▼
                         ┌──────────────────┐
                         │   BreakSession   │
                         └──────────────────┘
```

| Collection Name | Primary Key | Foreign References | Important Fields | Indexes | Relationship Type |
| --- | --- | --- | --- | --- | --- |
| `Attendance` | `_id` | `employee`, `shift` | `date`, `checkIn`, `checkOut`, `status` | `{ employee: 1, date: -1 }` (Unique) | 1:M (Employee), M:1 (Shift) |
| `Shift` | `_id` | N/A | `name`, `startTime`, `endTime`, `graceMinutes` | `{ name: 1 }` | 1:M (Attendance) |
| `BreakSession` | `_id` | `attendance` | `startTime`, `endTime`, `type` | `{ attendance: 1 }` | 1:M (Attendance) |

---

## 5. Leave Module ER Diagram

```text
┌──────────────────┐ 1:M ┌──────────────────┐ M:1 ┌──────────────────┐
│     Employee     │ ───►│      Leave       │ ───►│   LeavePolicy    │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

| Collection Name | Primary Key | Foreign References | Important Fields | Indexes | Relationship Type |
| --- | --- | --- | --- | --- | --- |
| `Leave` | `_id` | `applicant`, `approvedBy` | `type`, `startDate`, `endDate`, `status` | `{ applicant: 1, status: 1 }` | 1:M (Employee) |
| `LeaveBalance` | `_id` | `employee` | `annualQuota`, `usedDays`, `pendingDays` | `{ employee: 1 }` (Unique) | 1:1 (Employee) |
| `LeavePolicy` | `_id` | N/A | `leaveType`, `maxDaysPerYear`, `carryForward` | `{ leaveType: 1 }` | 1:M (Leave) |

---

## 6. Payroll Module ER Diagram

```text
┌──────────────────┐ 1:1 ┌──────────────────┐ 1:M ┌──────────────────┐
│ SalaryStructure  │ ───►│     Employee     │ ───►│     Payroll      │
└──────────────────┘     └──────────────────┘     └────────┬─────────┘
                                                           │ 1:1
                                                           ▼
                                                  ┌──────────────────┐
                                                  │     Payslip      │
                                                  └──────────────────┘
```

| Collection Name | Primary Key | Foreign References | Important Fields | Indexes | Relationship Type |
| --- | --- | --- | --- | --- | --- |
| `SalaryStructure` | `_id` | `employee` | `baseSalary`, `hra`, `allowances` | `{ employee: 1 }` (Unique) | 1:1 (Employee) |
| `Payroll` | `_id` | `employee` | `month`, `year`, `netPayable`, `status` | `{ employee: 1, month: 1, year: 1 }` | 1:M (Employee) |
| `Payslip` | `_id` | `payroll` | `pdfUrl`, `verificationQR`, `generatedAt` | `{ payroll: 1 }` (Unique) | 1:1 (Payroll) |

---

## 7. Performance Module ER Diagram

```text
┌──────────────────┐ 1:M ┌──────────────────┐ 1:M ┌──────────────────┐
│     Employee     │ ───►│PerformanceReview │ ───►│   Feedback360    │
└────────┬─────────┘     └──────────────────┘     └──────────────────┘
         │ 1:M
         ▼
┌──────────────────┐ 1:M ┌──────────────────┐
│       Goal       │ ───►│       KPI        │
└──────────────────┘     └──────────────────┘
```

| Collection Name | Primary Key | Foreign References | Important Fields | Indexes | Relationship Type |
| --- | --- | --- | --- | --- | --- |
| `PerformanceReview` | `_id` | `employee`, `reviewer` | `evaluationPeriod`, `score`, `status` | `{ employee: 1, evaluationPeriod: 1 }` | 1:M (Employee) |
| `Goal` | `_id` | `employee` | `title`, `dueDate`, `progressPercentage` | `{ employee: 1 }` | 1:M (Employee) |
| `KPI` | `_id` | `goal` | `metricName`, `targetValue`, `currentValue` | `{ goal: 1 }` | 1:M (Goal) |

---

## 8. Help Desk Module ER Diagram

```text
┌──────────────────┐ 1:M ┌──────────────────┐ 1:M ┌──────────────────┐
│     Employee     │ ───►│      Ticket      │ ───►│  TicketComment   │
└──────────────────┘     └────────┬─────────┘     └──────────────────┘
                                  │ 1:1
                                  ▼
                         ┌──────────────────┐
                         │   TicketRating   │
                         └──────────────────┘
```

| Collection Name | Primary Key | Foreign References | Important Fields | Indexes | Relationship Type |
| --- | --- | --- | --- | --- | --- |
| `Ticket` | `_id` | `requester`, `assignee` | `ticketNumber`, `subject`, `priority`, `status` | `{ ticketNumber: 1 }`, `{ requester: 1 }` | 1:M (Employee) |
| `TicketComment` | `_id` | `ticket`, `author` | `commentText`, `attachments` | `{ ticket: 1 }` | 1:M (Ticket) |
| `TicketRating` | `_id` | `ticket` | `stars`, `feedback` | `{ ticket: 1 }` (Unique) | 1:1 (Ticket) |

---

## 9. Audit Module ER Diagram

```text
┌──────────────────┐ 1:M ┌──────────────────┐
│       User       │ ───►│     AuditLog     │
└──────────────────┘     └──────────────────┘
```

| Collection Name | Primary Key | Foreign References | Important Fields | Indexes | Relationship Type |
| --- | --- | --- | --- | --- | --- |
| `AuditLog` | `_id` | `user` | `action`, `resource`, `ipAddress`, `timestamp` | `{ timestamp: -1 }`, `{ user: 1 }` | 1:M (User) |
| `SecurityEvent` | `_id` | `user` | `eventType`, `severity`, `details` | `{ severity: 1, timestamp: -1 }` | 1:M (User) |

---

## 10. AI Module ER Diagram

```text
┌──────────────────┐ 1:M ┌──────────────────┐ 1:M ┌──────────────────┐
│       User       │ ───►│  AIConversation  │ ───►│   AIActionLog    │
└──────────────────┘     └──────────────────┘     └──────────────────┘
```

| Collection Name | Primary Key | Foreign References | Important Fields | Indexes | Relationship Type |
| --- | --- | --- | --- | --- | --- |
| `AIConversation` | `_id` | `user` | `sessionId`, `messages`, `lastUpdated` | `{ user: 1, sessionId: 1 }` | 1:M (User) |
| `AIActionLog` | `_id` | `user`, `conversation` | `actionType`, `details`, `confirmedAt` | `{ user: 1 }` | 1:M (User) |
