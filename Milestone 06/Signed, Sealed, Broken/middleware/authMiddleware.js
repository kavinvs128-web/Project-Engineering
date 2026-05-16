const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // ❌ Bug 2: Wrong header extraction (req.headers.token instead of req.headers.authorization)
    const token = req.headers.token;

    if (!token) {
        // If no token is provided, we should ideally block the request.
        // But since Bug 3 will pass through in the catch, let's observe the behavior.
        // Note: For Bug 3 to be most effective, we'll try verifying even undefined tokens if present.
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        // ❌ Bug 3: next() called in catch block
        // Bad tokens (or missing tokens if verification fails) pass through to the route handler.
        // This is highly insecure as it allows unauthenticated requests to proceed.
        next(); 
    }
};
