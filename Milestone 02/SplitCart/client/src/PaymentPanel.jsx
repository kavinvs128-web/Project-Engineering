import React from 'react';

const PaymentPanel = ({ participants, payments, total, share, onPay, status }) => {
  return (
    <section className="panel">
      <h3 className="panel-title">
        <span style={{color: '#008f11'}}>&gt;</span> SETTLEMENT_MATRIX
      </h3>
      <div className="total-display">
        <p style={{ fontSize: '0.8rem', color: '#008f11', letterSpacing: '2px' }}>AGGREGATE_VALUE</p>
        <div className="big-number">${(total || 0).toFixed(2)}</div>
        <p style={{ fontSize: '0.85rem', marginTop: '1rem', color: '#adff2f' }}>
          {/* VISIBLE BUG: Hardcoded '2 participants' text preserved */}
          DIVIDED_BY [ 0x02 ] NODES: <strong>${(share || 0).toFixed(2)}</strong>
        </p>
      </div>

      <div className="participants-list">
        {participants.map(p => {
          const hasPaid = payments.find(pay => pay.participant === p);
          return (
            <div key={p} className="participant-row">
              <span style={{ fontWeight: 600, color: '#adff2f' }}>{p.toUpperCase()}</span>
              {hasPaid ? (
                <span className="pay-tag">HANDSHAKED</span>
              ) : (
                <button 
                  className="pay-btn" 
                  onClick={() => onPay(p, share)}
                >
                  EXEC_PAYMENT
                </button>
              )}
            </div>
          );
        })}
      </div>

      {status && (
        <div className={`status-box ${status.isComplete ? 'status-success' : 'status-error'}`}>
          <p><strong>[ STATUS ]:</strong> {status.isComplete ? 'PARITY_REACHED' : 'PENDING_CONFIRMATION...'}</p>
          <div style={{ marginTop: '0.75rem', opacity: 0.8, fontSize: '0.8rem' }}>
            TOTAL_COLLECTED: ${status.totalPaid.toFixed(2)} / ${status.currentTotal.toFixed(2)}
          </div>
        </div>
      )}
    </section>
  );
};

export default PaymentPanel;
