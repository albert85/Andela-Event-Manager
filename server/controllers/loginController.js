import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { user } from '../models';

dotenv.config();
export default class LogInControllerClass {
  static signIn(req, res) {
    return user
      .findOne({
        where: {
          email: req.body.email,
        },
      }).then((result) => {
      // compare the supplied information with the database
      // check if its record exist
        if (!result) {
          return res.status(400).json({ message: 'No record found' });
        }

        // check password
        bcrypt.compare(req.body.password, result.dataValues.password, (err, resp) => {
          if (resp) {
          // if passwords match
          // declare a payload
            const payloader = {
              isAdmin: user.isAdmin,
              id: result.id,
            };
            const userToken = jwt.sign(payloader, process.env.TOKEN_PASSWORD, { expiresIn: 60 * 7200 });
            if (userToken) return res.status(200).json({ message: 'successfully login', token: userToken });
          }
          // Passwords don't match
          return res.status(401).json({ message: 'Wrong password' });
        });
      }).catch(() => res.status(400).json({ message: 'Resource not Found' }));
  }
}
