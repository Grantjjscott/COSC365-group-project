class NewAccountHandler {

  fireregister(email, password) {
    console.log("attempting to create account...");
    firebase.auth().createUserWithEmailAndAccountPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
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
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function (error) {
        let errorCode = error.code;
        let errorMessage = error.message;

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
  }
}

handler = new NewAccountHandler;
window.onload = function () {
  // stores the data
  let userName = document.getElementById("email").value;;
  let pw = document.getElementById("password").value;

  // create element reference
  let email = document.getElementById("email")
  let password = document.getElementById("password");
  let newAccount = document.getElementById("NewUser");
  // add event handlers
  email.addEventListener("change", function () { userName = email.value; })
  password.addEventListener("change", function () { pw = password.value; console.log(pw) })
  newAccount.addEventListener('click', function () { handler.NewUser(userName, pw) })
}

