

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
    req.checkBody('centerId', 'Select center for the event based on ID no').notEmpty();
    if (!req.validationErrors()) {
      return next();
    }
    return res.json({ result: 'Please supply: name, bookingStatus, eventDate, centerId and centerId' });
  }

  static creatCenterValidation(req, res, next) {
    req.checkBody('name', 'Name of the center is required').notEmpty();
    req.checkBody('location', 'Please indicate location of the event center').notEmpty();
    req.checkBody('amount', 'Cost for booking the center').notEmpty();
    req.checkBody('capacity', 'capacity of the event').notEmpty();
    if (!req.validationErrors()) {
      return next();
    }
    return res.json({ result: 'Please supply: name, bookingStatus, eventDate, centerId and userId' });
  }
}
