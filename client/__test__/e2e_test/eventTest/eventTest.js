export default
{
  '@tags': ['eventHomePage'],
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
};
