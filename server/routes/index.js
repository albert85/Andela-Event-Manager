const userControllers = require('../controllers').userDetails;
// import user controller
// const { userController } = allControllers;

module.exports = (app) => {
  app.get('/api/v1/', (req, res) => {
    res.status(200).send({
      message: 'api working',
    });
  });

  app.post('/api/v1/users', userControllers.create);
};
// export default exportUser;
