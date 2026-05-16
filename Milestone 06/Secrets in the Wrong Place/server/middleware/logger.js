const logger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  
  // Flaw 10: Logging middleware logs the entire req.body (including passwords!)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log('Request body:', req.body);
  }
  
  next();
};

module.exports = logger;
