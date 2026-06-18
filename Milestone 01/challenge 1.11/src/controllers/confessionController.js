/**
 * Confessions Controller Layer
 * Handles HTTP requests and responses
 * No business logic here - delegates to services
 * Why: Keeps HTTP concerns separate from business logic for clean architecture
 */

const confessionService = require('../services/confessionService');
const { validateConfessionInput } = require('../utils/validators');
const { DELETE_TOKEN, VALID_CATEGORIES } = require('../utils/constants');

/**
 * POST /api/v1/confessions
 * Creates a new confession
 * Why: Validates input first, then delegates to service for storage
 */
const createConfession = (req, res) => {
  const confessionData = req.body;

  // Validate the input
  const validation = validateConfessionInput(confessionData);
  if (!validation.isValid) {
    return res.status(400).json({ error: validation.error });
  }

  // Create the confession via service
  const newConfession = confessionService.createConfession(confessionData);

  // Return the created confession
  res.status(201).json(newConfession);
};

/**
 * GET /api/v1/confessions
 * Retrieves all confessions
 */
const getAllConfessions = (req, res) => {
  const result = confessionService.getAllConfessions();
  res.json(result);
};

/**
 * GET /api/v1/confessions/:id
 * Retrieves a single confession by ID
 */
const getConfessionById = (req, res) => {
  const confessionId = parseInt(req.params.id, 10);

  const foundConfession = confessionService.getConfessionById(confessionId);

  if (!foundConfession) {
    return res.status(404).json({ error: 'Confession not found' });
  }

  res.json(foundConfession);
};

/**
 * GET /api/v1/confessions/category/:cat
 * Retrieves confessions filtered by category
 */
const getConfessionsByCategory = (req, res) => {
  const categoryParam = req.params.cat;

  // Validate the category parameter
  if (!VALID_CATEGORIES.includes(categoryParam)) {
    return res.status(400).json({ error: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}` });
  }

  const filteredConfessions = confessionService.getConfessionsByCategory(categoryParam);
  res.json(filteredConfessions);
};

/**
 * DELETE /api/v1/confessions/:id
 * Deletes a confession (requires authentication token)
 * Why: Validates delete token in header before calling service
 */
const deleteConfession = (req, res) => {
  // Check authentication token
  const deleteToken = req.headers['x-delete-token'];

  if (deleteToken !== DELETE_TOKEN) {
    return res.status(403).json({ error: 'Unauthorized: Invalid or missing delete token' });
  }

  if (!req.params.id) {
    return res.status(400).json({ error: 'Confession ID is required' });
  }

  const confessionId = parseInt(req.params.id, 10);

  // Delete via service
  const deletedConfession = confessionService.deleteConfession(confessionId);

  if (!deletedConfession) {
    return res.status(404).json({ error: 'Confession not found' });
  }

  res.json({ message: 'Confession deleted successfully', item: deletedConfession });
};

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
};
