const EMDetails = {

  signUpDetails: {
    email: 'you@example.com',
    password: '12345',
    isAdmin: 'true',
    lastName: 'React',
    firstName: 'Jest',
  },

  signUpResponse: {

    email: 'you@example.com',
    lastName: 'React',
    firstName: 'Jest',
  },

  loginDetail: {
    email: 'you@example.com',
    password: '12344',
  },

  loginResponse: 'successfully login',

  getEventResponse: {
    id: 1,
    userId: 1,
    name: 'Wedding',
    Venue: 'Adenike Hall',
    location: 'Ikeja',
    eventDate: '2018-12-12',
  },

  centerToSearch: {
    name: 'Andela',
    location: 'Anthony',
  },

  uploadDetails: {
    name: 'event.jpg',
    size: 3000,
    path: '/user/path/to/image',
  },

  getEditEventDetails: {
    id: 1,
    userId: 1,
    name: 'Wedding',
    Venue: 'Adenike Centre',
    location: 'Ikorodu',
    eventDate: '2017-12-12',
  },

  getEditEventDetailsResponse: {
    id: 1,
    userId: 1,
    name: 'Wedding',
    Venue: 'Adenike Hall',
    location: 'Ikeja',
    eventDate: '2018-12-12',
    eventId: 1,
  },


  getUserEmail: ['you@example.com'],

  getSentEmailNotification: 'successfully retrieved',

  getCentersDetails: [
    {
      id: 1,
      name: 'Adenike Hall',
      capacity: 1000,
      amount: 10000,
      location: 'Ikeja',
    },
    {
      id: 2,
      name: 'Apollan Hall',
      capacity: 100,
      amount: 100000,
      location: 'Lagos Island',
    },
  ],

  editACenter: {
    editCenterDetails: {
      id: 1,
      name: 'Adenike Hall',
      capacity: 1000,
      amount: 10000,
      location: 'Ikeja',
    },
    data: {
      message: 'successfuly updated',
    },
  },

  addNewCenterDetails: {
    id: 1,
    name: 'Adenike Hall',
    capacity: 1000,
    amount: 10000,
    location: 'Ikeja',
  },

  bookingStatusData: {
    id: 1,
    userId: 1,
    name: 'Wedding',
    Venue: 'Adenike Hall',
    location: 'Ikeja',
    eventDate: '2018-12-12',
    bookingStatus: 0,
  },

};
export default EMDetails;

