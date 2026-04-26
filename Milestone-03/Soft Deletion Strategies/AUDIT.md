# Pre-Refactor Audit — CorpFlow

## 1. Missing Tenant Isolation

1. users table has no tenant_id column  
   → Risk: Queries without filters will return users from all organisations (data breach)

2. projects table has no tenant_id column  
   → Risk: Projects from different companies can be accessed together

3. billing_details table has no tenant_id column  
   → Risk: Financial data can leak across tenants

---

## 2. No Tenant Boundaries in Relationships

4. projects.user_id is not restricted by tenant  
   → Risk: A project from Tenant A can reference a user from Tenant B

5. billing_details.user_id has no tenant validation  
   → Risk: Cross-tenant billing data exposure

---

## 3. Sensitive Fields Exposed

6. users.salary is stored without restriction  
   → Risk: Any API response may expose salary data

7. billing_details.card_last4 is exposed  
   → Risk: Financial data leakage

8. users.bank_account / ssn (if exists) is not protected  
   → Risk: Critical personal data exposure

---

## 4. No Role-Based Access Control (RBAC)

9. No role column or access logic exists  
   → Risk: All users can access all data

10. API does not differentiate Admin / Manager / User  
   → Risk: Unauthorized access to sensitive and other users' data

---

## 5. Insecure API Responses

11. API returns full user object directly  
   → Risk: Sensitive fields (salary, bank info) exposed in responses

12. No response filtering based on role  
   → Risk: Data visibility is not controlled

---

## 6. No Indexing on Key Columns

13. No index on tenant_id (not present yet)  
   → Risk: Slow queries and full table scans

14. No index on foreign keys (user_id, project_id)  
   → Risk: Poor performance at scale

---

## 7. Lack of Data Access Constraints

15. Users can fetch all users without restriction  
   → Risk: Full database exposure

16. No WHERE tenant_id filter enforced in queries  
   → Risk: Accidental cross-tenant data leaks

---

## 8. Summary of Security Risks

- No tenant isolation → cross-company data leaks  
- No RBAC → unauthorized access  
- Sensitive data exposed → privacy breach  
- No indexing → performance + scalability issues  