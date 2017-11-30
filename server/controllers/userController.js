import bcrypt from 'bcrypt';
import { user } from '../models';

export default class UserControllerClass {
  static signUp(req, res) {
    // Setting up password for hash
    const saltRound = 10;
    const { password } = req.body;

    bcrypt.hash(password, saltRound, (err, hash) => {
      return user
        .create({
          firstName: req.body.firstName,
          email: req.body.email,
          password: hash,
          isAdmin: req.body.isAdmin,
          lastName: req.body.lastName,
        })
        .then((userDetails) => {
          const { firstName, lastName, email } = userDetails;
          return res.status(200).send({ firstName, lastName, email });
        })
        .catch((error) => {
          return res.status(400).json({ message: 'Credential exists' });
        });
    });
  }
}
