class UserModel {
    constructor() {
      this.users = [];
    }
  
    async createUser(user) {
      this.users.push(user);
      return user;
    }
  
    async findUserByEmail(email) {
      return this.users.find((user) => user.email === email);
    }
  }
  
  module.exports = new UserModel();
  