class loadPost {

  getComments() {
    let query = database.ref('Feedback');
    query.equalTo(Postkey).on("Value", function (snapshot) {
      console.log(snapshot.val());
      snapshot.forEach(function (data) {
        console.log(data.key);
      });
    });
  }
}

handler = new mainpageHandler();

// When the window loads, getCurrentPost() will be triggered.
window.onload = () => {
  handler.getCurrentPost();
  handler.getComments();
}