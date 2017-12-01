import jwt from 'jsonwebtoken';
import { user } from '../models';

export default class LogInControllerClass {
  static signIn(req, res, next) {
    return user
      .findAll({
        where: {
          email: req.body.email,
        },
      })
      .then((result) => {
        if (result.length === 0) {
          return res.json('No record found, please check your credential or signup');
        }

        const bearerHeader = req.headers.authorization;
        if (typeof bearerHeader !== 'undefined') {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];
          req.token = bearerToken;
          // verify the token
          jwt.verify(req.token, process.env.TOKEN_PASSWORD, (err, data) => {
            if (err) {
              return res.json({ message: 'Unauthorized Entry' });
            }
            next(res.json({ message: 'sucessfull login', result: data }));
          });
        }
        return res.status(403).json({ message: 'Unauthorized Action' });
      })
      .catch(() => res.send({ message: 'Please check email and password' }));
  }
}
