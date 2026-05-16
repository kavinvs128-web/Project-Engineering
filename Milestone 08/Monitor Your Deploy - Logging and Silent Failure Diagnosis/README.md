# StockAPI — Starter Repository

## Challenge: Monitor Your Deploy (8.14)
## Deployed URL: https://stockapi-[hash].onrender.com

## The Problem
`GET /api/products` returns `200` with an empty array.
No errors in Render logs. No crashes. Just silence.

## Your Task
1. Open Render logs — observe the silence
2. Add `morgan` to `src/server.js` (`npm install morgan`)
3. Add `console.error` to every catch block
4. Set `NODE_ENV=production` in Render environment
5. Push → Render redeploys
6. Hit `GET /api/products` → read the Morgan line
7. Diagnose root cause from logs alone
8. Fix it → redeploy → confirm with new log line
9. Document in `MONITOR_LOG.md`
