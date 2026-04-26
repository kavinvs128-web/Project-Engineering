# Security Design — CorpFlow Refactor

This document explains the security architecture implemented after refactoring CorpFlow into a secure multi-tenant and RBAC-enabled system.

---

## 1. Tenant Isolation Strategy

All core tables now include a `tenant_id` column:
- users
- accounts
- transactions

All database queries enforce tenant filtering:

Example:
```sql
WHERE tenant_id = $1