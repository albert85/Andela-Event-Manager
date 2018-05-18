import bcrypt from 'bcrypt';
import db from '../models/index';

export default class UserController {
  static signUp(req, res) {
    // check if email exist
    // console.log(db.user);
    db.user.findAll({
      where: {
        email: req.body.email,
      },
    }).then((result) => {
      if (result.length !== 0) {
        return res.status(400).send({ message: 'Credential exist' });
      }

      // Setting up password for hash
      const saltRound = 10;
      const { password } = req.body;

      bcrypt.hash(password, saltRound, (err, hash) => db.user
        .create({
          firstName: req.body.firstName,
          email: req.body.email,
          password: hash,
          isAdmin: req.body.isAdmin,
          lastName: req.body.lastName,
        })
        .then((userDetails) => {
          const { firstName, lastName, email } = userDetails;
          res.status(201).send({
            message: 'sucessful', firstName, lastName, email,
          });
        })
        .catch(() => res.status(400).send({ message: 'Resource not Created' })));
    }).catch(err => res.status(400).send({ message: 'Resource not Found', error: err }));
  }
}
