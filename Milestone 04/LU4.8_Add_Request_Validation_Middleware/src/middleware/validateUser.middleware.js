/**
 * STUDENT ASSIGNMENT: Implement the 10 Validation Rules here.
 * You can use Manual JS, Zod, or Joi.
 */

function validateUser(req, res, next) {
    // TODO: Implement validation for R01 through R10
  
    // If validation fails, return 400 immediately with an array of errors.
    // return res.status(400).json({ error: "Validation failed", details: [...] });
    
    console.log("Validation middleware triggered, but no rules are enforced yet!");
    
    // If validation passes, hand off to the controller
    next(); 
  }
  
  module.exports = validateUser;