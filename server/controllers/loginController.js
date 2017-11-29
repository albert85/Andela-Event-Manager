

export default class LogInControllerClass {
  static create(req, res) {
    // logging in using email and password
    // check if the parameters are not supplied
    if(!req.body.username || !req.body.password){
      return res.status(404).json({message: 'Please supply credentials'});
    }
    // check if the password and username exist in the database
    
  };




};
