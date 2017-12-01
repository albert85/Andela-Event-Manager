

export default class ValidatorClass {
  static loginValidator(req, res, next) {
    // check for validity of the email
    req.checkBody('email', 'check email').notEmpty().isEmail();
    req.checkBody('password', 'Password required').notEmpty();

    if (!req.validationErrors()) {
      return next();
    }
    return res.json({ result: 'Please check your email and password' });
  }

  static signUpValidator(req, res, next) {
    req.checkBody('firstName', 'Firstname is required').notEmpty();
    req.checkBody('lastName', 'Lastname is required').notEmpty();
    req.checkBody('email', 'check email').notEmpty().isEmail();
    req.checkBody('password', 'Password required').notEmpty();
    if (!req.validationErrors()) {
      return next();
    }
    return res.json({ result: 'Please too check all your credentials are supplied: firstName, lastname, email, password' });
  }

  static createEventValidation(req, res, next) {
    req.checkBody('name', 'Name of the event is required').notEmpty();
    req.checkBody('bookingStatus', 'Please indicate if your booking').notEmpty();
    req.checkBody('eventDate', 'supply the date of event').notEmpty();
    req.checkBody('userId', 'supply email address').notEmpty();
    if (!req.validationErrors()) {
      return next();
    }
    return res.json({ result: 'Please supply: name, bookingStatus, eventDate, centerId and userId' });
  }
}
