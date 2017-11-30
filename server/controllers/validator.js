

export default class ValidatorClass {
  static loginValidator(req, res, next) {
    // check for validity of the email
    req.checkBody('email', 'check email').notEmpty().isEmail();
    req.checkBody('password', 'Password required').notEmpty();

    // req.sanitize('email').escape();
    // req.sanitize('email').trim();
    if (!req.validationErrors()) {
      return next();
    }
    return res.json({ result: 'Please check your email and password' });
  }

  static signUpValidator(req, res, next) {
    req.checkBody('fistName', 'Firstname is required').notEmpty();
    req.checkBody('lastName', 'Lastname is required').notEmpty();
    req.checkBody('email', 'check email').notEmpty().isEmail();
    req.checkBody('password', 'Password required').notEmpty();
    if (!req.validationErrors()) {
      return next();
    }
    return res.json({ result: 'Please too check all your credentials are supplied' });
  }

  static createEventValidation(req, res, next) {
    req.checkBody('name', 'Firstname is required').notEmpty();
    req.checkBody('bookingStatus', 'Lastname is required').notEmpty();
    req.checkBody('eventDate', 'Password required').notEmpty();
    if (!req.validationErrors()) {
      return next();
    }
    return res.json({ result: 'Please check all your credentials are supplied' });
  }
}
