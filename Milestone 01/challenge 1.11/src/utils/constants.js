/**
 * Constants for Dev Confessions API
 * Centralized configuration for valid categories, validation rules, and other constants
 */

const VALID_CATEGORIES = ["bug", "deadline", "imposter", "vibe-code"];
const MAX_TEXT_LENGTH = 500;
const MIN_TEXT_LENGTH = 1;
const DELETE_TOKEN = process.env.DELETE_TOKEN || 'supersecret123';
const PORT = process.env.PORT || 3000;

module.exports = {
  VALID_CATEGORIES,
  MAX_TEXT_LENGTH,
  MIN_TEXT_LENGTH,
  DELETE_TOKEN,
  PORT
};
