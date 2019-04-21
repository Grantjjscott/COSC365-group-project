function getComments() {
  let query = database.ref('Feedback');
  query.equalTo(Postkey).on("Value", function (snapshot) {
    console.log(snapshot.val());
    snapshot.forEach(function (data) {
      console.log(data.key);
    });
  });
}