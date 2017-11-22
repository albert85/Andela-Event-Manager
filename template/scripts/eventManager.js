    document.getElementById('signInBtn').addEventListener("click",()=>{
        // locate email input
        let email = document.getElementById('inputEmail').value;
        console.log(email);
        // get password
        let inputPassword = document.getElementById('inputPassword').value;
        // validate email and password to login in
        if(email === "admin@andela.com" && inputPassword === "admin"){
            document.URL('Admin.html');
        }else{

        }
    })
