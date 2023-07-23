import React, { useState } from 'react';


const PremiumPage = () => {
  const [paymentAmount, setPaymentAmount] = useState('');
  const [message, setMessage] = useState('');

  const handlePayment = () => {
    // Perform the mock payment (for demonstration purposes, we'll use hardcoded values)
    fetch('https://jsonplaceholder.typicode.com/pay-premium', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payment_amount: paymentAmount }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setMessage(data.message);
        } else {
          setMessage(data.error);
        }
      });
  };

  return (
    <div>
      <h1>Get Premium Membership</h1>
      <p>Pay $10 to become a premium member and view all posts!</p>
      <input
        type="text"
        placeholder="Payment Amount"
        value={paymentAmount}
        onChange={(e) => setPaymentAmount(e.target.value)}
      />
      <button onClick={handlePayment}>Pay Now</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PremiumPage;
