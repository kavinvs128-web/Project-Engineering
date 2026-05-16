# ShopLens — Slow Endpoints

Three endpoints are performing below acceptable thresholds. Investigate each using EXPLAIN ANALYZE.

## Endpoint 1 — Product Listing by Category
Route: GET /api/products?category=electronics
Problem: Consistently > 800ms under normal load
Expected: < 50ms

## Endpoint 2 — Recent Orders with User Info
Route: GET /api/orders/recent
Problem: 2-4 seconds, varies with database load
Expected: < 100ms

## Endpoint 3 — User Activity Log
Route: GET /api/users/:id/activity
Problem: 1.5-3 seconds even for low-activity users
Expected: < 100ms
