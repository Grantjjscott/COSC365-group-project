class createAccountHandler {

    fireregister(email, password) {
        console.log("attempting to create account...");
        firebase.auth().createUserWithEmailAndAccountPassword(email, password).catch(function(error) {
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
        });
    }

    createAccount(email, password, confirm-password) {
        console.log("attempting to create account...");
    }
}