// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// app.use(bodyParser.json());
// app.use(cors());


// const users = [];

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   const user = users.find(user => user.email === email && user.password === password);
//   if (!user) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   // Generate a token for the user and return it to the client
//   const token = generateToken(user);
//   res.json({ token });
// });

// app.post('/signup', (req, res) => {
//   const { name, email, password } = req.body;

//   const existingUser = users.find(user => user.email === email);
//   if (existingUser) {
//     return res.status(409).json({ message: 'User already exists' });
//   }

//   const newUser = { name, email, password };
//   users.push(newUser);

//   // Generate a token for the new user and return it to the client
//   const token = generateToken(newUser);
//   res.json({ token });
// });

// app.listen(4000, () => console.log('Server running on port 4000'));

// // Helper function to generate a token for a user
// function generateToken(user) {
//   // Generate a random string for the token
//   const token = Math.random().toString(36).substr(2);

//   // Store the token in memory
//   user.token = token;

//   return token;
// }


// app.listen(4000, () => console.log('Server running on port 4000'));
