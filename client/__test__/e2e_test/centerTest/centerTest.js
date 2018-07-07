import path from 'path';

export default {
  '@tags': ['center'],
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
      .waitForElementVisible('#cancelBookingBtn')
      .click('#cancelBookingBtn')
      .pause(2000)
      .end();
  },
};
