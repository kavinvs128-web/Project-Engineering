# Pre-Refactor Audit — CorpFlow

This audit identifies structural, relational, and API-level security issues in the existing system before refactoring.

---

## 1. Missing Tenant Isolation (Critical)

1. users table does not contain tenant_id  
   → Risk: Users from all organizations can be returned in a single query without filtering

2. projects table is not tenant-scoped  
   → Risk: Projects belonging to different companies can be accessed or modified across tenants

3. billing_details table has no tenant_id  
   → Risk: Financial records can be exposed across organizations

4. No enforcement of tenant boundaries at schema level  
   → Risk: Nothing prevents cross-tenant data relationships at database level

---

## 2. Broken Cross-Table Tenant Relationships

5. projects.user_id has no tenant validation constraint  
   → Risk: A project can reference a user from a different tenant

6. billing_details.user_id is not tenant validated  
   → Risk: Billing records can be linked to unauthorized users across tenants

7. No composite key enforcement (tenant_id + foreign key)  
   → Risk: Foreign keys do not guarantee tenant consistency

---

## 3. Sensitive Data Exposure (High Risk)

8. users.salary field exists without access restriction  
   → Risk: Salary information can be exposed through any API response

9. billing_details.card_last4 is accessible without role checks  
   → Risk: Financial metadata leakage

10. users.bank_account / ssn fields (if present) are stored without encryption or role restriction  
   → Risk: Severe privacy and compliance violation

---

## 4. Missing Role-Based Access Control (RBAC)

11. No role column exists in users table  
   → Risk: No distinction between Admin, Manager, and User permissions

12. No access control logic in API layer  
   → Risk: Every user can access all endpoints equally

13. No role-based filtering in responses  
   → Risk: Sensitive fields are returned to unauthorized users

---

## 5. Insecure API Response Handling

14. API returns raw database rows directly (SELECT *)  
   → Risk: All columns including sensitive fields are exposed unintentionally

15. No response sanitization layer before sending data  
   → Risk: Backend leaks sensitive information by default

16. No conditional field removal based on user role  
   → Risk: Unauthorized data exposure (salary, balances, etc.)

---

## 6. Missing Tenant Filters in Queries

17. SELECT queries do not enforce tenant_id filtering consistently  
   → Risk: Cross-tenant data leakage through API endpoints

18. DELETE and UPDATE operations do not always include tenant validation  
   → Risk: Data from another tenant may be modified or deleted

---

## 7. Missing Indexing Strategy (Performance + Security)

19. No index on tenant_id in any table  
   → Risk: Slow queries and full table scans in multi-tenant environment

20. No composite indexes (tenant_id + foreign keys)  
   → Risk: Inefficient joins and scaling issues under load

---

## 8. Lack of Data Integrity Constraints

21. No constraint ensuring foreign records belong to same tenant  
   → Risk: Invalid cross-tenant relationships can be created

22. No cascading tenant validation rules  
   → Risk: Orphaned or cross-tenant linked records possible

---

## 9. Summary of System Risks

- No tenant isolation → full cross-company data exposure risk
- No RBAC → all users have equal access to sensitive operations
- Sensitive financial and personal data exposed in plain queries
- API directly returns database responses without sanitization
- Missing indexing impacts scalability and performance
- No enforcement of tenant consistency across relationships