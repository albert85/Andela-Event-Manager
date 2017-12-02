import bcrypt from 'bcrypt';
import { user } from '../models';

export default class UserControllerClass {
  static signUp(req, res) {
    // check if email exist
    user.findAll({
      where: {
        email: req.body.email,
      },
    }).then((result) => {
      console.log(result.length);
      if (result.length !== 0) {
        return res.json({ message: 'Credential exist' });
      }

      // Setting up password for hash
      const saltRound = 10;
      const { password } = req.body;

      bcrypt.hash(password, saltRound, (err, hash) => user
        .create({
          firstName: req.body.firstName,
          email: req.body.email,
          password: hash,
          isAdmin: req.body.isAdmin,
          lastName: req.body.lastName,
        })
        .then((userDetails) => {
          const { firstName, lastName, email } = userDetails;
          res.status(200).send({ firstName, lastName, email });
        })
        .catch(() => res.status(400).json({ message: 'Signing Up not completed' })));
    }).catch(() => res.json({ message: 'Credential exists' }));
  }
}
