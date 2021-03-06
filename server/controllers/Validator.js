

export default class Validator {
  /**
   * @description validates details supplied to login an account
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static loginValidator(req, res, next) {
    // check for validity of the email
    req.checkBody('email', 'check email').notEmpty().isEmail();
    req.checkBody('password', 'Password required').notEmpty().isLength({ min: 5 });

    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied to signup a new account
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static signUpValidator(req, res, next) {
    req.checkBody('firstName', 'Supply your firstname').notEmpty().isLength({ max: 256 });

    req.checkBody('lastName', 'Supply your lastname ').notEmpty().isLength({ max: 256 });

    req.checkBody('email', 'Please supply a valid email address')
      .normalizeEmail().notEmpty().isEmail()
      .isLength({ max: 256 });

    req.checkBody('password', 'Password must have atleast six (6) characters')
      .notEmpty().isLength({ min: 6, max: 256 });

    if (!req.validationErrors()) {
      return next();
    }
    return req.getValidationResult()
      .then(result => res.status(400).json({ validation: false, result: result.mapped() }));
  }

  /**
   * @description validates details supplied to create an event
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static createEventValidation(req, res, next) {
    req.checkBody('name', 'Name of the event is required').notEmpty().isLength({ max: 256 });
    req.checkBody('bookingStatus', 'Please indicate 0 for booking or 1 for canceling a booking').notEmpty().isInt({ min: 0, max: 1 });
    req.checkBody('eventDate', 'Supply a valid date for the event').notEmpty().toDate().isAfter();
    req.checkBody('centerId', 'Please indicate the id of the center where where the event is to be booked').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied to edit an event
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static updateEventValidation(req, res, next) {
    req.checkBody('name', 'Name of the event is required').notEmpty().isLength({ max: 256 });
    req.checkBody('eventDate', 'Supply a valid date for the event').notEmpty().toDate().isAfter();
    req.checkBody('centerId', 'Please indicate the id of the center where where the event is to be booked').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied to create a center
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static creatCenterValidation(req, res, next) {
    req.checkBody('name', 'Name of the center is required').notEmpty().isLength({ max: 256 });
    req.checkBody('location', 'Please indicate location of the event center').notEmpty().isLength({ max: 256 });
    req.checkBody('amount', 'Spply the cost for booking the center').notEmpty().isFloat({ min: 0.00 });
    req.checkBody('capacity', 'Supply the capacity of the event').notEmpty().isInt({ min: 1 });
    req.checkBody('centerUrl', 'Supply a valid url to the center pictures').isURL().isLength({ max: 256 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied to edit a center
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static updateCenterValidation(req, res, next) {
    req.checkBody('name', 'Name of the center is required').notEmpty().isLength({ max: 256 });
    req.checkBody('location', 'Please indicate location of the event center (type: string)').notEmpty().isLength({ max: 256 });
    req.checkBody('amount', 'Please supply a valid integer for amount').notEmpty().isInt({ min: 0 });
    req.checkBody('capacity', 'Please supply a valid integer for capacity').notEmpty().isInt({ min: 1 });
    req.checkParams('centerId', 'Please supply a valid integer for centerId').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied to get a center
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static validateCenterId(req, res, next) {
    req.checkParams('centerId', 'Please supply a valid integer for centerId').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied to get a center's event details
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static validateCenterEventDetail(req, res, next) {
    req.checkParams('centerId', 'Please supply a valid integer for centerId').notEmpty().isInt({ min: 1 });
    req.checkParams('page', 'Please supply a valid integer for page number').notEmpty().isInt({ min: 1 });
    req.checkParams('limit', 'Please supply a valid integer for the maximum record to be sent').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }


  /**
   * @description validates details supplied to edit a center
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static validateParams(req, res, next) {
    req.checkParams('page', 'Please supplied the page number (integer with a minimum value of 1) to populate ').notEmpty().isInt({ min: 1 });
    req.checkParams('limit', 'Please indicate number of events to return').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied to get the event of a specific user
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static validateParamsUserEvent(req, res, next) {
    req.checkParams('centerId', 'Please supply a valid integer for centerId').notEmpty().isInt({ min: 1 });
    req.checkParams('userIdNo', 'Please supply a valid integer for user id number').notEmpty().isInt({ min: 1 });
    req.checkParams('page', 'Please supplied the page number (integer with a minimum value of 1) to populate ').notEmpty().isInt({ min: 1 });
    req.checkParams('limit', 'Please indicate number of events to return').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied for event id
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static validateParamsEventId(req, res, next) {
    req.checkParams('eventId', 'Please supply a valid integer for event id').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validates details supplied for user id
   * @param {object} req request
   * @param {object} res response
   * @returns {object}
   */

  static validateParamsUserId(req, res, next) {
    req.checkParams('userId', 'Please supply a valid integer for user id').notEmpty().isInt({ min: 1 });
    if (!req.validationErrors()) {
      return next();
    }
    return res.status(400).json({ validation: false, result: req.validationErrors() });
  }

  /**
   * @description validate supplied data to updates user's role
   * @param {object} req
   * @param {object} res
   * @returns {oject}
   */

  static validateUserChangeRole(req, res, next) {
    req.checkBody('firstName', 'Supply your firstname').notEmpty().isLength({ max: 256 });

    req.checkBody('lastName', 'Supply your lastname ').notEmpty().isLength({ max: 256 });

    req.checkBody('isAdmin', 'Please supply the role of the user (true or false) as admin').notEmpty().isBoolean();

    req.checkParams('userId', 'Please supply a valid integer for user id').notEmpty().isInt({ min: 1 });

    req.checkBody('email', 'Please supply a valid email address')
      .normalizeEmail().notEmpty().isEmail()
      .isLength({ max: 256 });

    if (!req.validationErrors()) {
      return next();
    }
    return req.getValidationResult()
      .then(result => res.status(400).json({ validation: false, result: result.mapped() }));
  }

  /**
   * @description validate supplied data for sent user's email
   * @param {object} req
   * @param {object} res
   * @returns {oject}
   */

  static validateMailData(req, res, next) {
    req.checkBody('messageBody', 'Please include a messsage in the body').notEmpty();

    req.checkBody('email', 'Please supply valid email address')
      .normalizeEmail().notEmpty().isEmail()
      .isLength({ max: 256 });

    if (!req.validationErrors()) {
      return next();
    }
    return req.getValidationResult()
      .then(result => res.status(400).json({ validation: false, result: result.mapped() }));
  }
}
