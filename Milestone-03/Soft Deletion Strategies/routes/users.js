const express = require('express');
const router = express.Router();
const db = require('../db');

// TEMP (simulate logged-in user)
const currentUser = {
  id: 1,
  role: 'ADMIN', // change to 'MANAGER' or 'USER' to test
  tenantId: 1
};

// GET all users in the system
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE tenant_id = $1',
      [currentUser.tenantId]
    );

    let data = rows;

    // RBAC: restrict data visibility
    if (currentUser.role === 'USER') {
      // User can only see their own profile
      data = rows.filter(user => user.id === currentUser.id);
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Database execution error' });
  }
});

// GET single user details by ID
router.get('/:id', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM users WHERE id = $1 AND tenant_id = $2',
      [req.params.id, currentUser.tenantId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const user = rows[0];

    // RBAC: USER can only access their own data
    if (currentUser.role === 'USER' && user.id !== currentUser.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Database retrieval error' });
  }
});

// CREATE a new user
router.post('/', async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const { rows } = await db.query(
      'INSERT INTO users (name, email, role, tenant_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, role || 'USER', currentUser.tenantId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'User creation failed' });
  }
});

// DELETE user permanently from the system (Admin only)
router.delete('/:id', async (req, res) => {
  // RBAC: only Admin can delete users
  if (currentUser.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { rowCount } = await db.query(
      'DELETE FROM users WHERE id = $1 AND tenant_id = $2',
      [req.params.id, currentUser.tenantId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User permanently deleted from LedgerApp' });
  } catch (err) {
    res.status(500).json({ error: 'Delete operation failed' });
  }
});

module.exports = router;