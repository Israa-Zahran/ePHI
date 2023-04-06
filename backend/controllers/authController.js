const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');



class AuthController {
  async signup(req, res) {
    const { name, email,DateOfBirth, MedicalHistory, MedicationsAndDosages, Allergies, MedicalTestResults, password } = req.body;

    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
         
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await userModel.createUser({ name, email,DateOfBirth, MedicalHistory, MedicationsAndDosages, Allergies, MedicalTestResults, password: hashedPassword });
   

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

    res.json({ token });
  }

 
  async getUserByEmail(req, res) {
    const { email } = req.query;
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    
    res.json({ user });
  }




  async editUser(req, res) {
    const { email } = req.query;
    const { name, DateOfBirth, MedicalHistory, MedicationsAndDosages, Allergies, MedicalTestResults } = req.body;
  
    const user = await userModel.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    // update userData
    user.name = name;
    user.DateOfBirth = DateOfBirth;
    user.MedicalHistory = MedicalHistory;
    user.MedicationsAndDosages = MedicationsAndDosages;
    user.Allergies = Allergies;
    user.MedicalTestResults = MedicalTestResults;
  
    return res.status(200).json({ message: 'User data updated successfully' });
  }
  



  


}

module.exports = new AuthController();
