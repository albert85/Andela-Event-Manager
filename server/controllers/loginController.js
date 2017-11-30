
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
        if (result.length === 0) {
          return res.json('No record found, please check your credential or signup');
        }
        
        return res.json({ message: `Welcome ${result.firstName}` });
      })
      .catch(() => { return res.send({ message: 'Please check email and password' }); });
  }
}
