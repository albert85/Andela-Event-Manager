import path from 'path';

export default
{

  'SignUp e2e test': (client) => {
    client
      .url('http://localhost:8000/signup')
      .waitForElementVisible('body', 2000)
      .assert.visible('form.sigUpinnersection')
      .assert.visible('input#firstname')
      .setValue('input[type=text]', 'firstName')
      .assert.visible('input#lastname')
      .setValue('input[id=lastname]', 'lastName')
      .assert.visible('input#signupemail')
      .setValue('input[type=email]', 'andela@gmail.com')
      .assert.visible('input#siguppassword')
      .setValue('input[type=password]', '123456')
      .assert.visible('input#signupconfirmpassword')
      .setValue('input[id=signupconfirmpassword]', '123456')
      .waitForElementVisible('button[id=signupbtn]', 1000)
      .click('button[id=signupbtn]')
      .end();
  },
  'Login e2e test': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 2000)
      .assert.title('Event Manager')
      .waitForElementVisible('a#signupLink', 1000)
      .click('a#signupLink')
      .waitForElementVisible('a#signLink', 1000)
      .click('a#signLink')
      .assert.visible('form.text-white')
      .assert.visible('input#inputEmail')
      .setValue('input[type=email]', 'admin@role.com')
      .assert.visible('input#inputPassword')
      .setValue('input[type=password]', '123456')
      .waitForElementVisible('button[id=loginbtn]', 1000)
      .click('button[id=loginbtn]')
      .end();
  },

  'EventHomePage e2e test': function (client) {
    client
    // Log into the acccount
      .url('http://localhost:8000')
      .setValue('input[type=email]', 'andela@gmail.com')
      .setValue('input[type=password]', '123456')
      .waitForElementVisible('button[id=loginbtn]', 1000)
      .click('button[id=loginbtn]')
      .waitForElementVisible('table.table-sm', 1000)
      .assert.visible('table.table-sm')

      // Add an event
      .assert.visible('form#addEventForm')
      .setValue('#eventname', 'Wedding')
      .assert.visible('#achorSelectCenter')
      .click('#achorSelectCenter')
      .waitForElementVisible('#selectCenter', 1000)
      .waitForElementVisible('div.card:first-child', 1000)
      .waitForElementVisible('div.card:first-child a.btn', 1000)
      .click('div.card>a.btn')
      .setValue('#eventdate', '03-09-2018')
      .waitForElementVisible('#eventAddBtn', 1000)
      .execute(() => {
        document.querySelector('#eventAddBtn').click();
      })

      // Add an event
      .assert.visible('form#addEventForm')
      .setValue('#eventname', 'Birthday')
      .assert.visible('#achorSelectCenter')
      .click('#achorSelectCenter')
      .waitForElementVisible('#selectCenter', 1000)
      .waitForElementVisible('div.card:first-child', 1000)
      .waitForElementVisible('div.card:first-child a.btn', 1000)
      .click('div.card>a.btn')
      .setValue('#eventdate', '10-09-2018')
      .waitForElementVisible('#eventAddBtn', 1000)
      .execute(() => {
        document.querySelector('#eventAddBtn').click();
      })


      // Edit an event
      .execute(() => {
        document.querySelector('#editEventNav').click();
      })
      .waitForElementVisible('table.table-sm', 1000)
      .assert.visible('#editButton')
      .click('#editButton')
      .clearValue('#eventnameEdit')
      .setValue('#eventnameEdit', 'Meeting')
      .setValue('#eventdateEdit', '09-09-2018')
      .click('#saveBtn')
      .pause(1000)

      // View available booking in a center
      .execute(() => {
        document.querySelector('#bookingNav').click();
      })
      .waitForElementVisible('#centerName', 1000)
      .assert.visible('#centerName')
      .setValue('#centerName', 'Andela')
      .setValue('#eventCenterLocation', 'ikeja')
      .click('#searchBtn')

      // delete an event
      .click('#eventHome')
      .click('#delBtn')
      .end();
  },
  'Center e2e Test': (client) => {
    client
    // Log into the acccount
      .url('http://localhost:8000')
      .setValue('input[type=email]', 'admin@role.com')
      .setValue('input[type=password]', '123456')
      .waitForElementVisible('button[id=loginbtn]', 1000)
      .click('button[id=loginbtn]')
      .waitForElementVisible('table.table-sm', 1000)
      .assert.visible('table.table-sm')

      // Create an account
      .assert.visible('form#addNewCenterForm')
      .setValue('#centerName', 'Italian')
      .setValue('#centerLocation', 'Anthony')
      .setValue('#eventcentercapacity', '100')
      .setValue('#eventcenteramount', '10000')
      .setValue('input[type="file"]', path.resolve('client/public/img/eventCenter3.jpg'))
      .pause(6000)
      .assert.visible('#addCenter')
      .click('#addCenter')
      .pause(2000)

      // Edit a center
      .execute(() => {
        document.querySelector('#editCenterNav').click();
      })
      .pause(1000)
      .assert.visible('#centernameEdit')
      .assert.visible('#editCenterDetails:first-child')
      .click('#editCenterDetails:first-child')
      .clearValue('#centernameEdit')
      .setValue('#centernameEdit', 'Appollan')
      .clearValue('#eventcenterlocationEdit')
      .setValue('#eventcenterlocationEdit', 'Surulere')
      .clearValue('#eventcentercapacityEdit')
      .setValue('#eventcentercapacityEdit', '3000')
      .clearValue('#eventcenteramountEdit')
      .setValue('#eventcenteramountEdit', '300000')
      .setValue('input[type="file"]', path.resolve('client/public/img/eventCenter3.jpg'))
      .pause(6000)
      .click('#editButton')
      .pause(3000)
      .click('#editCloseBtn')

      // Cancel a booking
      .execute(() => {
        document.querySelector('#viewCenterNav').click();
      })
      .click('#selectEventCenter')
      .waitForElementVisible('#selectCenter', 1000)
      .waitForElementVisible('div.card:first-child', 1000)
      .waitForElementVisible('div.card:first-child a.btn', 1000)
      .click('div.card>a.btn')
      .waitForElementVisible('#cancelBookingBtn', 1000)
      .click('#cancelBookingBtn')
      .pause(2000)
      .end();
  },

};

