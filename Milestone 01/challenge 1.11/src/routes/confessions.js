/**
 * Routes for Dev Confessions API
 * Defines HTTP endpoints and immediately delegates to controllers
 * Why: Separates endpoint definitions from business logic and HTTP concerns
 * No business logic here - just routing
 */

const express = require('express');
const router = express.Router();
const confessionController = require('../controllers/confessionController');

/**
 * POST /api/v1/confessions
 * Create a new confession
 */
router.post('/confessions', confessionController.createConfession);

/**
 * GET /api/v1/confessions
 * Retrieve all confessions (sorted by newest first)
 */
router.get('/confessions', confessionController.getAllConfessions);

/**
 * GET /api/v1/confessions/:id
 * Retrieve a specific confession by ID
 */
router.get('/confessions/:id', confessionController.getConfessionById);

/**
 * GET /api/v1/confessions/category/:cat
 * Retrieve confessions filtered by category
 * Note: This route must be defined AFTER the /:id route to avoid matching conflicts
 */
router.get('/confessions/category/:cat', confessionController.getConfessionsByCategory);

/**
 * DELETE /api/v1/confessions/:id
 * Delete a confession (requires x-delete-token header)
 */
router.delete('/confessions/:id', confessionController.deleteConfession);

module.exports = router;
