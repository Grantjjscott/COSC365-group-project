

class LoginHandler{
    
    firelogin( email, password){
      console.log("attempting to log in...");
      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
       
        if (errorCode ==='auth/wrong-password' ) {
          alert('Wrong password.');
        
        return errorCode;
          
        }
        if (errorCode ==='auth/invalid-email' ) {
          
          console.log(  "invalid email. from auth");
        
          return errorCode;
          
        }
  
        if (errorCode ==='auth/user-not-found' ) {
          alert('No user found');
          
        return errorCode;          
        } 
       
      });
  }
    
    Login (email,password) {
    console.log("attempting to log in...");
    
        this.firelogin(email, password);

    
  
    firebase.auth().onAuthStateChanged(function(user){
  
      if(user){
        window.location.href =("./index.html")
      }
      
    });
  }
    signOut(){
      console.log("signing out")
      firebase.auth().signOut().then(function() {
      }).catch(function(error) {
        // An error happened.
      });
    
    
    
   
        
    

  }
    
    
    
    NewUser = (email, password ) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        var errorCode = error.code;
        
        var errorMessage = error.message;
       
        // ...
        if (errorCode == 'auth/weak-password') {
          console.log('The password is too weak.')
          return('The password is too weak.');
        }
        
        if (errorCode == 'auth/email-already-in-use') {
          
          console.log('Email is already in use');
          return('Email is already in use');
       
        }
        if (errorCode ==='auth/invalid-email' ) {
          
          console.log('invalid email.');
          return('invalid email.');
          
        }
    
        console.log(error);
      });
         
    }
  }
    handler = new LoginHandler;
   window.onload= function(){
    // stores the data
    var userName = document.getElementById("email").value;;
    var pw = document.getElementById("password").value; 
    
     // create element reference
     var email = document.getElementById("email")
    var password = document.getElementById("password");
    var login = document.getElementById("login");
        // add event handlers
      email.addEventListener("change",  function(){userName = email.value;})
      password.addEventListener("change",  function(){pw = password.value; console.log(pw)})
      login.addEventListener('click', function(){ handler.Login(userName, pw) } )


   
    
      var signout = document.querySelector('#signout')
      signout.addEventListener('click', function(){handler.signOut()})
    
  }