import { useState, useEffect } from 'react';

const Deposit = ({ initialBalance }) => {
  const [balance, setBalance] = useState(initialBalance);

  // Update the balance in local storage whenever it changes
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('balance', balance);
    }
  }, [balance]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the deposit amount from the form input field and convert it to a number
    const depositAmount = parseInt(event.target.elements.depositAmount.value, 10);

    // Update the balance by adding the deposit amount
    setBalance((prevBalance) => prevBalance + depositAmount);
  };

  return (
    <div>
      <h1>Deposit</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Deposit Amount:
          <input type="number" name="depositAmount" />
        </label>
        <button type="submit">Deposit</button>
      </form>
      <p>Total Balance: {balance}</p>
    </div>
  );
};

Deposit.getInitialProps = async ({ req }) => {
  let initialBalance;

  if (req) {
    // Initialize the balance state with a value from the server
    initialBalance = await fetch('/api/balance').then((res) => res.json());
  } else {
    // Initialize the balance state with a value from local storage, or 0 if it doesn't exist
    initialBalance = parseInt(localStorage.getItem('balance')) || 0;
  }

  return { initialBalance };
};

export default Deposit;
