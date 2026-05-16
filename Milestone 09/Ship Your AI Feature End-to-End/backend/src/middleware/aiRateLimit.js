// backend/src/middleware/aiRateLimit.js
// CONSTRAINT 4: Per-user rate limiting using JWT user ID as key.
// keyGenerator MUST use req.user.id — not req.ip.
// authMiddleware must run BEFORE this middleware to set req.user.

import rateLimit from 'express-rate-limit'

export const aiRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 hour window

  // Adjust max based on your feature cost and expected usage
  // Justify your choice in README: N requests × $cost/req = max $X/user/hr
  max: 20,

  // CONSTRAINT: Key by authenticated user ID, not IP address
  // IP can be spoofed with proxies. User ID is tied to the JWT.
  keyGenerator: (req) => req.user?.id?.toString() || req.ip,

  standardHeaders: true,
  legacyHeaders: false,

  handler: (req, res) => {
    console.warn('[RATE_LIMIT_EXCEEDED]', JSON.stringify({
      timestamp: new Date().toISOString(),
      userId: req.user?.id,
      endpoint: req.path
    }))
    return res.status(429).json({
      error: true,
      message: 'AI request limit reached. Try again in 60 minutes.',
      statusCode: 429,
      retryAfter: 3600
    })
  }
})
