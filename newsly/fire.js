

    const config = {
        apiKey: "AIzaSyBV4dw1tPFOVwlJDp1NFyxeSWn7JseJKc8",
        authDomain: "cosc365.firebaseapp.com",
        databaseURL: "https://cosc365.firebaseio.com",
        projectId: "cosc365",
        storageBucket: "cosc365.appspot.com",
        messagingSenderId: "218187384395"
      };
      firebase.initializeApp(config);

console.log("loaded");

firebase.auth().signInWithEmailAndPassword("email", "password").catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode);
});




