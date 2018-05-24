module.exports =
 {
   'login e2e test': function (client) {
     client
       .url('http://localhost:8000')
       .waitForElementVisible('body', 2000)
       .assert.title('Document')
       .assert.visible('form.text-white')
       .end();
   },
 };

