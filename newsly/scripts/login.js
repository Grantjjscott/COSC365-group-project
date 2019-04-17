class LoginHandler {

  firelogin(email, password) {
    console.log("attempting to log in...");
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
      let errorCode = error.code;
      let errorMessage = error.message;
      console.log(errorCode);

      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        return errorCode;
      }

      if (errorCode === 'auth/invalid-email') {
        console.log("invalid email. from auth");
        return errorCode;
      }

      if (errorCode === 'auth/user-not-found') {
        alert('No user found');
        return errorCode;
      }
    });
  }

  Login(email, password) {
    console.log("attempting to log in...");
    this.firelogin(email, password);

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        window.location.href = ("../client/index.html")
      }
    });
  }

  signOut() {
    console.log("signing out")
    firebase.auth().signOut().then(function () {
    }).catch(function (error) {
      return res.status(400).json(error);
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

handler = new LoginHandler;
window.onload = function () {
  // stores the data
  let userName = document.getElementById("email").value;;
  let pw = document.getElementById("password").value;

  // create element reference
  let email = document.getElementById("email")
  let password = document.getElementById("password");
  let login = document.getElementById("login");
  // add event handlers
  email.addEventListener("change", function () { userName = email.value; })
  password.addEventListener("change", function () { pw = password.value; console.log(pw) })
  login.addEventListener('click', function () { handler.Login(userName, pw) })

  let signout = document.querySelector('#signout')
  signout.addEventListener('click', function () { handler.signOut() })
}