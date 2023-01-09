import { useState, useEffect } from 'react';

const Withdraw = ({ initialBalance }) => {
  const [balance, setBalance] = useState(initialBalance);

  // Update the balance in local storage whenever it changes
  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('balance', balance);
    }
  }, [balance]);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the withdraw amount from the form input field and convert it to a number
    const withdrawAmount = parseInt(event.target.elements.withdrawAmount.value, 10);

    // Update the balance by subtracting the withdraw amount
    setBalance((prevBalance) => prevBalance - withdrawAmount);
  };

  return (
    <div>
      <h1>Withdraw</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Withdraw Amount:
          <input type="number" name="withdrawAmount" />
        </label>
        <button type="submit">Withdraw</button>
      </form>
      <p>Total Balance: {balance}</p>
    </div>
  );
};

Withdraw.getInitialProps = async ({ req }) => {
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

export default Withdraw;
