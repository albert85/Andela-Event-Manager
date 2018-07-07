
export default
{
  '@tags': ['login'],
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
};

