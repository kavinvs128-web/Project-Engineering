/**
 * Validation utilities for confession data
 * Handles all input validation logic to keep controllers clean
 */

const { VALID_CATEGORIES, MAX_TEXT_LENGTH, MIN_TEXT_LENGTH } = require('./constants');

/**
 * Validates the confession input data
 * Why: Separates validation logic from request handling for reusability and testability
 * @param {Object} confessionData - The confession object to validate
 * @returns {Object} { isValid: boolean, error: string|null }
 */
const validateConfessionInput = (confessionData) => {
  // Check if data exists
  if (!confessionData) {
    return { isValid: false, error: 'Request body is required' };
  }

  // Check if text field exists
  if (!confessionData.text) {
    return { isValid: false, error: 'Text field is required' };
  }

  // Check minimum length
  if (confessionData.text.length < MIN_TEXT_LENGTH) {
    return { isValid: false, error: 'Text must not be empty' };
  }

  // Check maximum length
  if (confessionData.text.length > MAX_TEXT_LENGTH) {
    return { isValid: false, error: `Text must be less than ${MAX_TEXT_LENGTH} characters long` };
  }

  // Check if category exists
  if (!confessionData.category) {
    return { isValid: false, error: 'Category is required' };
  }

  // Check if category is valid
  if (!VALID_CATEGORIES.includes(confessionData.category)) {
    return { isValid: false, error: `Category must be one of: ${VALID_CATEGORIES.join(', ')}` };
  }

  return { isValid: true, error: null };
};

module.exports = {
  validateConfessionInput
};
