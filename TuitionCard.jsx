import React from 'react';

function TuitionCard({ tuition }) {
  if (!tuition) return null;
  return (
    <div style={{ border: '1px solid #1976d2', borderRadius: 8, padding: 12, margin: '16px 0', background: '#e3f2fd' }}>
      <div><b>Student Number:</b> {tuition.studentNumber}</div>
      <div><b>Amount Due:</b> {tuition.amountDue}</div>
      <div><b>Term:</b> {tuition.term}</div>
      <div><b>Due Date:</b> {tuition.dueDate}</div>
      {tuition.unpaid && !tuition.paymentStatus && (
        <button style={{ marginTop: 12, background: '#1976d2', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 16px' }}>
          Pay Now
        </button>
      )}
      {tuition.paymentStatus === 'success' && (
        <div style={{ color: 'green', marginTop: 8 }}>Payment successful.</div>
      )}
    </div>
  );
}

export default TuitionCard;
