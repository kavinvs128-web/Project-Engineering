/**
 * Confessions Service Layer
 * Contains all business logic for confession operations
 * Why: Separates business logic from HTTP concerns for testability and reusability
 */

// In-memory data store (in production, this would be a database)
let confessions = [];
let confessionIdCounter = 0;

/**
 * Creates a new confession
 * Why: Encapsulates the logic for generating IDs and adding to storage
 * @param {Object} confessionData - The confession data { text, category }
 * @returns {Object} The created confession with generated id and timestamp
 */
const createConfession = (confessionData) => {
  const newConfession = {
    id: ++confessionIdCounter,
    text: confessionData.text,
    category: confessionData.category,
    created_at: new Date()
  };

  confessions.push(newConfession);
  console.log(`[SERVICE] Created confession with ID ${newConfession.id}`);

  return newConfession;
};

/**
 * Retrieves all confessions sorted by most recent first
 * Why: Centralize sorting logic in the service layer
 * @returns {Object} { data: Array, count: number }
 */
const getAllConfessions = () => {
  // Sort confessions by creation date (newest first)
  const sortedConfessions = [...confessions].sort((a, b) => b.created_at - a.created_at);

  console.log(`[SERVICE] Retrieved ${sortedConfessions.length} confessions`);

  return {
    data: sortedConfessions,
    count: sortedConfessions.length
  };
};

/**
 * Retrieves a single confession by ID
 * Why: Encapsulates the find logic for easier testing
 * @param {number} confessionId - The ID to search for
 * @returns {Object|null} The confession if found, null otherwise
 */
const getConfessionById = (confessionId) => {
  const foundConfession = confessions.find(item => item.id === confessionId);

  if (foundConfession) {
    console.log(`[SERVICE] Found confession ${confessionId} with ${foundConfession.text.length} characters`);
  } else {
    console.log(`[SERVICE] Confession ${confessionId} not found`);
  }

  return foundConfession || null;
};

/**
 * Retrieves confessions filtered by category
 * Why: Encapsulates filtering logic for reusability
 * @param {string} category - The category to filter by
 * @returns {Array} Filtered confessions sorted by newest first
 */
const getConfessionsByCategory = (category) => {
  const filteredConfessions = confessions
    .filter(item => item.category === category)
    .sort((a, b) => b.created_at - a.created_at);

  console.log(`[SERVICE] Retrieved ${filteredConfessions.length} confessions in category '${category}'`);

  return filteredConfessions;
};

/**
 * Deletes a confession by ID
 * Why: Encapsulates deletion logic with proper error handling
 * @param {number} confessionId - The ID to delete
 * @returns {Object|null} The deleted confession if found, null otherwise
 */
const deleteConfession = (confessionId) => {
  const confessionIndex = confessions.findIndex(item => item.id === confessionId);

  if (confessionIndex !== -1) {
    const deletedConfession = confessions.splice(confessionIndex, 1)[0];
    console.log(`[SERVICE] Deleted confession ${confessionId}`);
    return deletedConfession;
  }

  console.log(`[SERVICE] Cannot delete: confession ${confessionId} not found`);
  return null;
};

module.exports = {
  createConfession,
  getAllConfessions,
  getConfessionById,
  getConfessionsByCategory,
  deleteConfession
};
