const express = require('express');
const router = express.Router();
const db = require('../db');

// Simulated logged-in user
const currentUser = {
  id: 1,
  role: 'ADMIN', // change to 'MANAGER' or 'USER' to test
  tenantId: 1
};

const tenantId = currentUser.tenantId;

// GET all accounts
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM accounts WHERE tenant_id = $1',
      [tenantId]
    );

    let data = rows;

    // USER → only their own accounts
    if (currentUser.role === 'USER') {
      data = rows.filter(acc => acc.user_id === currentUser.id);
    }

    // Hide balance for non-admins
    if (currentUser.role !== 'ADMIN') {
      data = data.map(acc => ({
        id: acc.id,
        user_id: acc.user_id,
        account_type: acc.account_type,
        created_at: acc.created_at
      }));
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Database execution error' });
  }
});

// GET accounts by user_id
router.get('/user/:userId', async (req, res) => {
  const requestedUserId = parseInt(req.params.userId);

  // USER can only access their own accounts
  if (currentUser.role === 'USER' && requestedUserId !== currentUser.id) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { rows } = await db.query(
      'SELECT * FROM accounts WHERE user_id = $1 AND tenant_id = $2',
      [requestedUserId, tenantId]
    );

    let data = rows;

    // Hide balance for non-admins
    if (currentUser.role !== 'ADMIN') {
      data = rows.map(acc => ({
        id: acc.id,
        user_id: acc.user_id,
        account_type: acc.account_type,
        created_at: acc.created_at
      }));
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Database retrieval error' });
  }
});

// CREATE account (secure tenant check)
router.post('/', async (req, res) => {
  const { user_id, account_type, balance } = req.body;

  try {
    // Ensure user belongs to same tenant
    const userCheck = await db.query(
      'SELECT id FROM users WHERE id = $1 AND tenant_id = $2',
      [user_id, tenantId]
    );

    if (userCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid user for this tenant' });
    }

    const { rows } = await db.query(
      'INSERT INTO accounts (user_id, account_type, balance, tenant_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [user_id, account_type, balance, tenantId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Account creation failed' });
  }
});

// DELETE account (Admin only)
router.delete('/:id', async (req, res) => {
  if (currentUser.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { rowCount } = await db.query(
      'DELETE FROM accounts WHERE id = $1 AND tenant_id = $2',
      [req.params.id, tenantId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    res.json({ message: 'Account permanently deleted from LedgerApp' });
  } catch (err) {
    res.status(500).json({ error: 'Delete operation failed' });
  }
});

module.exports = router;