# ShopGrid — Pagination Baseline

## Before — Unpaginated GET /api/products
- Response size:
- Response time:
- Records returned:
- Database row count:

## After — Paginated GET /api/products?page=1&limit=20
- Response size:
- Response time:
- Records returned:
- Total pages:

## Improvement
- Size reduction: % smaller
- Time reduction: % faster

## Boundary Tests

| Input | HTTP Status | data.length | hasNextPage | Notes |
|-------|-------------|-------------|-------------|-------|
| page=0 | | | | |
| page=-5 | | | | |
| page=99999 | | | | |
| page=[last page] | | | | |
| page=hello | | | | |
