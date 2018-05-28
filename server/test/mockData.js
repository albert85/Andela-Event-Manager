const endPointTestData = {

  signUpData: {
    firstName: 'Shemilore',
    email: 'adenike@gmail.com',
    password: '123456',
    isAdmin: true,
    lastName: 'Adeniji',
  },

  changeRole: {
    firstName: 'Shemilore',
    email: 'adenike@gmail.com',
    password: '123456',
    isAdmin: false,
    lastName: 'Adeniji',
  },

  secondUserSignUp: {
    firstName: 'React',
    email: 'react@gmail.com',
    password: '123456',
    isAdmin: false,
    lastName: 'Test',
  },

  adminSignUpData: {
    firstName: 'Albert',
    email: 'admin@role.com',
    password: '123456',
    isAdmin: true,
    lastName: 'Temitope',
  },


  loginData: {
    email: 'adenike@gmail.com',
    password: '123456',
  },

  loginData2: {
    email: 2222,
    password: '123456',
  },

  adminLoginData: {
    email: 'admin@role.com',
    password: '123456',
  },


  wrongLoginData: {
    email: 'adenike@gmail.com',
    password: '1234567',
  },

  emailNotFound: {
    email: 'noemail@found.com',
    password: '1234567',
  },

  centerData: {
    name: 'Andela',
    location: 'Anthony',
    capacity: 200,
    amount: 30000.00,
    centerUrl: 'http://example.com',
  },
  centerData2: {
    name: 'Adenike',
    location: 'Shomolu',
    capacity: 200,
    amount: 30000.00,
    centerUrl: 'http://example.com',
  },
  centerData3: {
    name: 'WasZup',
    location: 'Kosofe',
    capacity: 200,
    amount: 30000.00,
    centerUrl: 'http://example.com',
  },
  centerData4: {
    name: 'Admiral',
    location: 'Surulere',
    capacity: 200,
    amount: 30000.00,
    centerUrl: 'http://example.com',
  },

  updateCenterData: {
    name: 'Andela',
    location: 'ikeja',
    capacity: 500,
    amount: 300000.00,
  },

  eventData: {
    name: 'Birthday Party',
    bookingStatus: 0,
    centerId: 1,
    eventDate: new Date('2017-12-25'),
  },

  eventData2: {
    name: 'Wedding',
    bookingStatus: 0,
    centerId: 1,
    eventDate: new Date('2017-12-25'),
  },

  updateEventData: {
    name: 'Birthday Party',
    bookingStatus: 0,
    centerId: 1,
    eventDate: new Date('2017-12-26'),
  },

  cancelEvent: {
    name: 'Birthday Party',
    bookingStatus: 1,
    centerId: 1,
    eventDate: new Date('2017-12-26'),
  },

  wrongCancelEventDate: {
    name: 'Birthday Party',
    bookingStatus: 1,
    centerId: 1,
    eventDate: new Date('hdhhel101'),
  },

  signUpPredefineError: 'Credential exist, login into the account or use another email address',

};

export default endPointTestData;
