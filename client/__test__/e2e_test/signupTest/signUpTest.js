export default
{
  '@tags': ['signup'],
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
};
