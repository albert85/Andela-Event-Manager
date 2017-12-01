import jwt from 'jsonwebtoken';
import { user } from '../models';

export default class Auth {
  static checkIfAuthorize(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      return next();
    }
    return res.status(403).json({ message: 'Unauthorized Action' });
  }

  static checkIfAuthToManage(req, res, next) {
    const decoded = jwt.verify(req.token, process.env.TOKEN_PASSWORD);
    if (!decoded) {
      return res.json({ message: 'Token ezpired' });
    }

    // find if authorize
    return user
      .findOne({
        where: {
          id: decoded.id,
        },
      }).then((result) => {
        if (!result.isAdmin) {
          return res.json({ message: 'You are not authorized' });
        }
        return next();
      }).catch(() => res.json({ message: 'Record does not exist' }));
  }
}
