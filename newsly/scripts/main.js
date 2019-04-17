function signOut() {
  console.log("signing out")
  firebase.auth().signOut().then(function () {
    console.log('Successfully Signed out');
  }).catch(function (error) {
    return res.status(400).json(error);
  });
}

window.onload = () => {
  let listener = document.querySelector('#signout')
  listener.addEventListener('click', signOut())
}
