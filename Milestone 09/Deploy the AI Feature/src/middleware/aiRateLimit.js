import rateLimit from 'express-rate-limit'

export const aiRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
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
