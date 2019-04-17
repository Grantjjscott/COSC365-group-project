

function signOut(){
    console.log("signing out")
    firebase.auth().signOut().then(function() {
    }).catch(function(error) {
      // An error happened.
    });
  
    
  }
  window.onload=()=>{

    var listener = document.querySelector('#signout')
    listener.addEventListener('click', signOut())
  }
