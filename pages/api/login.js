const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Verify the email and password against your database or authentication service
  // For example, you could check if the email and password match an account in a database
  if (email === 'user@example.com' && password === 'password') {
    // If the email and password are valid, return a success response
    res.send({ success: true });
  } else {
    // If the email and password are invalid, return an error response
    res.status(400).send({ success: false, error: 'Invalid email or password' });
  }
});

app.listen(3000, () => console.log('Server listening on port 3000'));
