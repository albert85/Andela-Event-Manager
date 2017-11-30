document.getElementById('signInBtn').addEventListener('click', () => {
  // locate email input
  const email = document.getElementById('inputEmail').value;
  //   alert(email);
  // get password
  const inputPassword = document.getElementById('inputPassword').value;


  // validate email and password to login in
  if (email !== 'admin@andela.com' && inputPassword !== 'admin' && email.length !== 0 && inputPassword.length !== 0) {
    document.location.href = 'userpage.html';
  } else if (email === 'admin@andela.com' && inputPassword === 'admin' && email.length !== 0 && inputPassword.length !== 0) {
    document.location.href = 'Admin.html';
  }
});
