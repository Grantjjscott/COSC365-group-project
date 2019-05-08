class NewAccountHandler {

  fireregister(email, password) {
    console.log("attempting to create account...");
    firebase.auth().createUserWithEmailAndAccountPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      console.log(errorCode);

      if (errorCode === 'auth/invalid-email') {
        alert('Email does not exist.');
        return errorCode;
      }

      if (errorCode === 'auth/email-already-in-use') {
        alert('Email is already taken.');
        return errorCode;
      }

      if (errorCode === 'auth/operation-not-allowed') {
        alert('Email and password not enabled.');
        return errorCode;
      }

      if (errorCode === 'auth/weak-password') {
        alert('Password is not strong enough.');
        return errorCode;
      }

      if (password != confirmPassword) {
        alert('Passwords do not match');
      }
    });
  }

  NewUser = (email, password) => {
    if (document.getElementById("password").value != document.getElementById("confirmPassword").value) {
      alert('passwords do not match');
    } else {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function (error) {
          let errorCode = error.code;

          if (errorCode == 'auth/weak-password') {
            console.log('The password is too weak.')
            return ('The password is too weak.');
          }

          if (errorCode == 'auth/email-already-in-use') {
            console.log('Email is already in use');
            return ('Email is already in use');
          }

          if (errorCode === 'auth/invalid-email') {
            console.log('invalid email.');
            return ('invalid email.');
          }

          console.log(error);
        });
      window.location.href = ("../client/login.html");
    }
  }
}

handler = new NewAccountHandler;
window.onload = function () {
  let userName = document.getElementById("email").value;;
  let pw = document.getElementById("password").value;
  // create element reference
  let email = document.getElementById("email")
  let password = document.getElementById("password");
  let newAccount = document.getElementById("NewUser");
  // add event handlers
  email.addEventListener("change", () => { userName = email.value; })
  password.addEventListener("change", () => { pw = password.value; console.log(pw) })
  newAccount.addEventListener('click', () => { handler.NewUser(userName, pw) })
}