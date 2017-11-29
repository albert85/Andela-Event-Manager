
import { user } from '../models';

export default class LogInControllerClass {
  static signIn(req, res) {
    return user
      .findAll({
        where: {
          email: req.body.email,
        },
      })
      .then((result) => {
        return res.send({ message: result });
      })
      .catch(() => { return res.send({ message: 'Please check email and password' }); });
  }
}
