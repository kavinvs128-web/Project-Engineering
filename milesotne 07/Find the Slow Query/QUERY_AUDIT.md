# ShopLens — Query Performance Audit

**Investigated by:**
**Date:**
**Database row counts at time of audit:**
- Products table:
- Orders table:
- Users table:
- Activity table:

---

## Query 1 — GET /api/products?category=electronics

### The SQL (from Prisma query log)

### EXPLAIN ANALYZE Output

### Key Metrics from the Plan
- Node type:
- Estimated total cost:
- Actual execution time:
- Rows returned:
- Rows removed by filter:

### Bottleneck

### Proposed Fix

### Why This Fix Addresses the Bottleneck

---

## Query 2 — GET /api/orders/recent

### The SQL (from Prisma query log)

### EXPLAIN ANALYZE Output

### Key Metrics from the Plan
- Node type:
- Estimated total cost:
- Actual execution time:
- Rows returned:
- Rows removed by filter:

### Bottleneck

### Proposed Fix

### Why This Fix Addresses the Bottleneck

---

## Query 3 — GET /api/users/:id/activity

### The SQL (from Prisma query log)

### EXPLAIN ANALYZE Output

### Key Metrics from the Plan
- Node type:
- Estimated total cost:
- Actual execution time:
- Rows returned:
- Rows removed by filter:

### Bottleneck

### Proposed Fix

### Why This Fix Addresses the Bottleneck
