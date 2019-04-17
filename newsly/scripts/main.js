
class mainpageHandler{

  signOut() {
    console.log("signing out")
    firebase.auth().signOut().then(function () {
      console.log('Successfully Signed out');
    }).catch(function (error) {
      return res.status(400).json(error);
    });
  }
  getAllPosts(database){
    console.log("querying the database");
    
      var query = database.ref('news/');
      var results = [];
      console.log("right before query")
      query.on("child_added", function(data){
        
         results=console.log(data.val().date);;
        
});

  }

}

handler = new mainpageHandler();

window.onload = () => {
  database = firebase.database();
handler.getAllPosts( database);

}
