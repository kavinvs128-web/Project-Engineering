# Security Design — CorpFlow Refactor

## Tenant Isolation
All tables include tenant_id.
All queries filter by tenant_id.
This prevents cross-tenant data access.

## Role-Based Access Control (RBAC)

Roles implemented:
- Admin → full access
- Manager → restricted access (no sensitive data)
- User → only own data

## Sensitive Fields

- accounts.balance → restricted (Admin only)
- transactions.amount → restricted (Admin only)

## API Protection

- All endpoints filter by tenant_id
- Responses are modified based on role
- Sensitive fields removed for non-admin users

## Cross-Tenant Protection

- Validation added during account & transaction creation
- Prevents linking data across tenants

## Indexing

- Indexes added on tenant_id for performance