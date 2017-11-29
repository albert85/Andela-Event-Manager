

export default class ValidatorClass {
  static loginValidator(req, res) {
    req.checkBody('email', 'Invalid email').notEmpty();
    req.checkBody('password', 'invalid password').notEmpty();
    req.getValidationResult()
      .then((result) => {
        if (!result.isEmpty()) {
          res.json({ message: result });
        }
      });
  }
}
