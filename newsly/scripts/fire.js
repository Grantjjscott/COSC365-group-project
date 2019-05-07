class fireStarter {
  start() {
    const config = {
      apiKey: "AIzaSyBV4dw1tPFOVwlJDp1NFyxeSWn7JseJKc8",
      authDomain: "cosc365.firebaseapp.com",
      databaseURL: "https://cosc365.firebaseio.com",
      projectId: "cosc365",
      storageBucket: "cosc365.appspot.com",
      messagingSenderId: "218187384395"
    };
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const userName = user.email;

        document.querySelector('#Account').innerHTML = (userName);

        let usermenu = `
        <button class="dropdown-item"  id ="signout" onclick='signOut()'>Sign Out</button>`

        $('#user-menu').append(usermenu);
      } else {
        let usermenu = `
        <a class="dropdown-item"  id="option1"href="login.html">Login</a>
        <a class="dropdown-item"  id ="option2"href="createaccount.html">Sign Up</a>`
        $('#user-menu').append(usermenu)
      }
    });
    console.log("loaded");
  }
}

function signOut() {
  console.log("signing out")
  firebase.auth().signOut().then(() => {
    console.log('Successfully Signed out');
    window.location.reload();
  }).catch(function (error) {
    return res.status(400).json(error);
  });
}

starter = new fireStarter();
starter.start();
database = firebase.database();