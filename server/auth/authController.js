import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { user } from '../models';

export default class AuthUser {
  static authenUser(req, res) {
    // check if the person is authenticated
    return user
      .findOne({
        where: {
          email: req.body.email,
        },
      }).then((result) => {
        // compare the supplied information with the database
        // check if its record exist
        if (!result) {
          return res.json({ message: 'No record found' });
        }
        // check password
        bcrypt.compare(req.body.password, result.dataValues.password, (err, resp) => {
          if (resp) {
            // if passwords match
            // declare a payload
            const payloader = {
              isAdmin: user.isAdmin,
            };
            const userToken = jwt.sign(payloader, req.body.password, { expiresIn: 60 * 60 });
            if (userToken) return res.json({ message: 'successful' });
          }
        });

        // Passwords don't match
        return res.json({ message: 'Wrong password' });
      });
  }
}
