const express = require('express');
const router = express.Router();
const db = require('../db');

// Simulated logged-in user
const currentUser = {
  id: 1,
  role: 'ADMIN', // change to test
  tenantId: 1
};

const tenantId = currentUser.tenantId;

// GET all transactions
router.get('/', async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT * FROM transactions WHERE tenant_id = $1',
      [tenantId]
    );

    let data = rows;

    // USER → only their own transactions (via accounts)
    if (currentUser.role === 'USER') {
      const userAccounts = await db.query(
        'SELECT id FROM accounts WHERE user_id = $1 AND tenant_id = $2',
        [currentUser.id, tenantId]
      );

      const accountIds = userAccounts.rows.map(acc => acc.id);
      data = rows.filter(tx => accountIds.includes(tx.account_id));
    }

    // Hide amount for non-admins
    if (currentUser.role !== 'ADMIN') {
      data = data.map(tx => ({
        id: tx.id,
        account_id: tx.account_id,
        type: tx.type,
        description: tx.description,
        created_at: tx.created_at
      }));
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Database execution error' });
  }
});

// GET transactions by account
router.get('/account/:accountId', async (req, res) => {
  const accountId = parseInt(req.params.accountId);

  try {
    // Verify account belongs to tenant
    const accCheck = await db.query(
      'SELECT * FROM accounts WHERE id = $1 AND tenant_id = $2',
      [accountId, tenantId]
    );

    if (accCheck.rows.length === 0) {
      return res.status(404).json({ error: 'Account not found' });
    }

    // USER → only own account
    if (currentUser.role === 'USER' && accCheck.rows[0].user_id !== currentUser.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { rows } = await db.query(
      'SELECT * FROM transactions WHERE account_id = $1 AND tenant_id = $2',
      [accountId, tenantId]
    );

    let data = rows;

    // Hide amount for non-admins
    if (currentUser.role !== 'ADMIN') {
      data = rows.map(tx => ({
        id: tx.id,
        account_id: tx.account_id,
        type: tx.type,
        description: tx.description,
        created_at: tx.created_at
      }));
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Database retrieval error' });
  }
});

// CREATE transaction
router.post('/', async (req, res) => {
  const { account_id, amount, type, description } = req.body;

  try {
    // Ensure account belongs to tenant
    const accCheck = await db.query(
      'SELECT * FROM accounts WHERE id = $1 AND tenant_id = $2',
      [account_id, tenantId]
    );

    if (accCheck.rows.length === 0) {
      return res.status(400).json({ error: 'Invalid account for this tenant' });
    }

    const { rows } = await db.query(
      'INSERT INTO transactions (account_id, amount, type, description, tenant_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [account_id, amount, type, description, tenantId]
    );

    res.status(201).json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Transaction record creation failed' });
  }
});

// DELETE transaction (Admin only)
router.delete('/:id', async (req, res) => {
  if (currentUser.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    const { rowCount } = await db.query(
      'DELETE FROM transactions WHERE id = $1 AND tenant_id = $2',
      [req.params.id, tenantId]
    );

    if (rowCount === 0) {
      return res.status(404).json({ error: 'Transaction ID not found' });
    }

    res.json({ message: 'Transaction record permanently erased from LedgerApp' });
  } catch (err) {
    res.status(500).json({ error: 'Delete operation failed' });
  }
});

module.exports = router;