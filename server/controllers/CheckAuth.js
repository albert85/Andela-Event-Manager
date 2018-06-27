import jwt from 'jsonwebtoken';
import db from '../models/index';

export default class CheckAuth {
  static checkIfAuthorize(req, res, next) {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      return next();
    }
    return res.status(403).json({ success: false, result: 'Unauthorized Action' });
  }

  static checkIfAuthToManage(req, res, next) {
    jwt.verify(req.token, process.env.TOKEN_PASSWORD, (err, decoded) => {
      if (!decoded) {
        return res.status(401).json({
          success: false,
          result: 'Token expired, please login to get another token',
          err,
          token_oput: req.token,
        });
      }
      // find if authorize
      return db.user
        .findOne({
          where: {
            id: decoded.id,
          },
        }).then((result) => {
          if (!result.isAdmin) {
            return res.status(401).json({ success: false, result: 'You are not authorized' });
          }
          return next();
        }).catch(() => res.status(400).json({ success: false, result: 'Record does not exist' }));
    });
  }
}
