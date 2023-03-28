const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');



// const crypto = require('crypto');

// const generateSecretKey = (length) => {
//   return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
// };

// // Usage
// const secretKey = generateSecretKey(64); // generates a 64-character secret key
// console.log("hhhhhhhhhhhhhhwjdhedjkkhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
// console.log(secretKey);



class AuthController {
  async signup(req, res) {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
         
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await userModel.createUser({ name, email, password: hashedPassword });
   

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.status(201).json({ user, token });
  }

  async login(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

    res.json({ user, token });
  }
}

module.exports = new AuthController();
